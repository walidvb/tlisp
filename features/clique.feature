Feature: Cliques!

    Scenario: I join a clique
        Given there is 1 clique
        When I visit the clique invitation page
        And I choose to sign up
        Then I belong to the clique

    Scenario: I invite friends to a clique
        Given I am logged in
        And I belong to a clique
        Then I can invite people to the clique