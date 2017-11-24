Fabricator(:user) do
    name "George Washington"
    email "george@washington.com"
    password "the-password"
    password_confirmation "the-password"
    confirmed_at 1.day.ago
end
