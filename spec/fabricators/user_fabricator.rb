Fabricator(:user) do
    name "George Washington"
    email  {sequence(:email) {|i| "yorg_#{i}@coche.com"}}
    password "the-password"
    password_confirmation "the-password"
    confirmed_at 1.day.ago
end
