Feature: I post a line

    @wip
    Scenario: I post a link
        Given I am signed in
        When I post a link
        Then I can see the link