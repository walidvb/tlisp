Given("I belong to a clique") do
  @clique = Fabricate(:clique)
  @user.cliques << @clique
  @user.save!
end

When("I visit the clique invitation page") do
  visit join_clique_path @clique
  expect(page).to have_content(@clique.name)
end

Then("I belong to the clique") do
  expect(@user.cliques).to include(@clique)
end

Then("I can invite people to the clique") do
  visit clique_path @clique
  expect(page).to have_content(join_clique_path(@clique))
end