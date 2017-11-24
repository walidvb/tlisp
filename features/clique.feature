Feature: Cliques!

    @wip
    Scenario: I join a clique
        Given there is 1 clique
        When I visit the clique invitation page
        And I choose to sign up
        Then I belong to the clique