When("I visit the clique invitation page") do
  visit join_clique_path @clique
  expect(page).to have_content(@clique.name)
  click_on 'Sign up and join clique'
end

Then("I belong to the clique") do
  expect(@user.cliques).to include(@clique)
end