Feature: I post a link

    @javascript
    Scenario: I post a link
        Given I am logged in
        And I belong to a clique
        When I post a link
        Then I can see the link