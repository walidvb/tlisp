Feature: I create and browse playlists

    Scenario: I add a link to playlist
        Given I am logged in
        And I belong to a clique
        And I have a playlist
        When I post a link to the playlist
        And I visit my playlist
        Then I should see the link

    Scenario: I browse playlists
        Given I am logged in
        And I have 2 playlists
        Then I should see my playlists on my playlists page

    Scenario: I see my friends' playlists
        Given I am logged in
        And I belong to a clique
        And I have a friend called adyssa
        And adyssa has playlists
        And the playlist has links
        Then I should see the playlist in my clique