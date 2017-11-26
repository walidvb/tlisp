# Generated with RailsBricks
# Initial seed file to use with Devise User Model
ActsAsTaggableOn::Tag.delete_all
ActsAsTaggableOn::Tagging.delete_all
Link.delete_all
Playlist.delete_all
Clique.delete_all
User.delete_all

# Temporary admin account
u = User.first || Fabricate( :user,
    email: "you@me.com",
    initials: 'wvb',
    name: 'walid',
    password: "1234",
    password_confirmation: "1234",
    admin: true
)
u.skip_confirmation!

p "Creating first clique"
c1 = Fabricate(:clique, name: 'the dev')
u.cliques << c1

p "Adding links to clique"
10.times do |i|
    Fabricate(:link, clique: c1, user: u, url: "https://soundcloud.com/ste-machine/a1-snuffo-hello-mona?#{i}")
end


p "Creating second clique"
c2 = Fabricate(:clique, name: 'the other dev')
u.cliques << c2

p "Adding links to clique"
3.times do |i|
    Fabricate(:link, user: u, clique: c2, url: "https://www.youtube.com/watch?v=QhpVibUw8qk&#{i}")
end


p "Creating playlists"
p1 = Fabricate(:playlist, name: 'My first playlist', user: u)
p2 = Fabricate(:playlist, name: 'My second playlist', user: u)

p "Adding Links to playlists"
20.times do |i|
    url = (i%2 == 0) ? "https://soundcloud.com/glyk-musik/glykmix6-maut-k-down-by-the-river?#{i}" : "https://www.youtube.com/watch?v=eo0l0yQ2OsQ&#{i}"
    Fabricate(:link, user: u, clique: c1, url: url, playlists: [p1])
end

u.save!