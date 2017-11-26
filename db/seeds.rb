# Generated with RailsBricks
# Initial seed file to use with Devise User Model
Link.delete_all
Playlist.delete_all
Clique.delete_all
User.delete_all
ActAsTaggable::Tag.delete_all
ActAsTaggable::Taggings.delete_all

# Temporary admin account
u = Fabricate( :user,
    email: "you@me.com",
    initials: 'wvb',
    name: 'walid',
    password: "1234",
    password_confirmation: "1234",
    admin: true
)
u.skip_confirmation!

p "Creating first clique"
c = Fabricate(:clique, name: 'the dev')
u.cliques << c

p "Adding links to clique"
10.times do |i|
    Fabricate(:link, clique: c, user: u, url: "https://soundcloud.com/ste-machine/a1-snuffo-hello-mona?#{i}")
end


p "Creating second clique"
c2 = Fabricate(:clique, name: 'the other dev')
u.cliques << c2

p "Adding links to clique"
3.times do |i|
    Fabricate(:link, user: u, clique: c2, url: "https://www.youtube.com/watch?v=QhpVibUw8qk?#{i}")
end


p "Creating playlists"
Fabricate(:playlist, name: 'My first playlist', user: u)
Fabricate(:playlist, name: 'My second playlist', user: u)

p "Adding Links to playlists"
3.times do |i|
    Fabricate(:link, user: u, clique: c2, url: "https://www.youtube.com/watch?v=eo0l0yQ2OsQ?#{i}")
end

u.save!