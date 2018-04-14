class Link < ActiveRecord::Base
    acts_as_notifiable :users,
         targets: ->(link, key) {
            (link.mentionned_users).uniq
         },
         # TODO: move description to comments, and make comments acts_as_notifiable instead
         # tracked: { only: [:create] },
         notifier: :author

    default_scope {order("created_at DESC")}

    acts_as_taggable_on :tags, :genre
    serialize :oembed, Hash
    has_many :playlist_assignments, inverse_of: :link
    has_many :playlists, through: :playlist_assignments, inverse_of: :links
    
    has_many :link_clique_assignments, inverse_of: :link
    has_many :users, through: :link_clique_assignments, inverse_of: :links
    has_many :cliques, through: :link_clique_assignments, inverse_of: :links

    has_many :plays, inverse_of: :link
    
    before_create :add_oembed
    after_create :notify_world!
    
    scope :oembeddable, -> { where(oembeddable: true) }
    scope :visible, -> { where(published: true)}
    
    validates_presence_of :url
    validates_uniqueness_of :url

    def is_duplicate?
        self.clique.links.where(url: self.url).count > 0
    end

    def assign_to options = { users: [], visible: true }
        visible = options[:visible] || true
        options[:users].each do |user|
            uid = user.is_a?(User) ? user.id : user
            cliques = options[:cliques].presence
            if cliques.nil? || cliques.empty?
                # HACK TODO: serve a form to edit rather than skipping adding link assignments
                self.link_clique_assignments << LinkCliqueAssignment.new(user_id: uid, visible: visible)
            else
                cliques.each do |clique|
                    cid = clique.is_a?(Clique) ? clique.id : clique
                    if self.link_clique_assignments.where(clique_id: cid, user_id: uid).empty?
                        self.link_clique_assignments << LinkCliqueAssignment.new(user_id: uid, clique_id: cid, visible: visible)
                    end
                end
            end
        end
    end

    def self.search(search)
        if search
            where("title ILIKE ?", "%#{search}%")
        else
            return self
        end
        # if search
        #     search_length = search.split.length
        #     find(:all, :conditions => [(['title LIKE ?'] * search_length).join(' AND ')] + search.split.map { |name| "%#{name}%" })
        # else
        #     find(:all)
        # end
    end
    # =================== NOTIFICATIONS

    def author
        # TODO: this won't work when multiple users post the link
        self.users.first
    end

    def mentionned_users
        self.description.blank? ? [] : User.where(id: self.description.scan(/\(users:(\d+)\)/).flatten)
    end

    def safe_description
        self.description.blank? ? '' : self.description.gsub(/@\[([[[:alpha:]]| |_|-]+)\]\(\w+:[[[:alpha:]]| |_|-]+\)/, '\1')
    end

    def notify_world!
        return if !Rails.env.production?
        emoji = %w{🌴 🏖 👍 🤘 🎉 ✌🏻 👌 🤷‍♂️ 💫 🔥 🌈 📻 🛀🏿}.sample
        
        payload = {
            attachments: [{
                fallback: "#{self.title} digged! 🎶",
                title: "#{self.title} digged! #{emoji}",
                title_link: "http://diggersdelights.herokuapp.com",
                text: self.safe_description,
                image_url: self.thumbnail_url,
                thumb_url: self.thumbnail_url,
                author_name: author.try(:name),
                footer: "Thank you for trying diggersdelights!",
                ts: self.created_at.to_i,
            }]
        }
        Slack.post! ENV['DD_SLACK_WEBHOOK_URL'], payload
        DDTwitter.post "#{self.author.name} just digged #{self.title}! #{self.tags} #{self.url}"
        self.cliques.each do |cc|
            if !cc.slack_url.blank?
                Slack.post! cc.slack_url, payload 
            end
        end
    end

    # ======================= ATTRS
    [   "description",
        "html",
        "author_name",
        "author_url",
        "height",
        "width",
        "provider_name",
        "provider_url"
    ].each do |oembed_method|
        define_method oembed_method do |*args|
            self.respond_to?(oembed_method.to_sym) && !self.read_attribute(oembed_method.to_sym).blank? ? self.read_attribute(oembed_method.to_sym) : self.oembed[oembed_method]
        end
    end

    def thumbnail_url
        self.oembed['thumbnail_url'] || self.oembed['image']
    end

    def add_oembed
        if new_oembed = get_oembed
            self.oembed = get_oembed
            self.title = self.oembed['title']
            self.oembeddable = true
        else
            self.oembeddable = false
        end
        # Always return true to validate
        return true
    end

    private
    def get_oembed
        DDOEmbed.get(self.url)
    end
    


end
