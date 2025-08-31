Feature: Agify API

  As a QA Engineer
  I want to test the agify.io API
  So that I can ensure it returns expected responses for valid and invalid inputs

  Scenario: Get estimated age for a valid name
    Given I have the name "billybob"
    When I send a request to the Agify API
    Then the response status should be 200
    And the response should include the name "billybob"
    And the response should include an age as a number
    And the response should include a count greater than 0

  Scenario: Get estimated age for full name
    Given I have the name "meghana shashikanth"
    When I send a request to the Agify API
    Then the response status should be 200
    And the response should include the name "meghana shashikanth"
    And the response should include an age as a number

  Scenario: Request with empty name parameter
    Given I have an empty name
    When I send a request to the Agify API
    Then the response should include the name ""

  Scenario: Request with missing name parameter
    Given no name is provided
    When I send a request to the Agify API without any parameter
    Then the response should return a 422 error

  Scenario: Request with non-alphabetic characters in name
    Given I have the name "12345"
    When I send a request to the Agify API
    Then the response status should be 200
    And the response should include the name "12345"
    And the response should include the age as null

  Scenario: Request with special characters in name
    Given I have the name "$%&*"
    When I send a request to the Agify API
    Then the response status should be 200
    And the response should include the name "$%&*"
    And the response should include the age as null

  Scenario: Request with diacritics in name parameter
    Given I have the name "Áine"
    When I send a request to the Agify API
    Then the response status should be 200
    And the response should include an age as a number

  Scenario: Request with multiple names
    Given I have the names "Alice", "James" and "John"
    When I send a request to the Agify API in batch mode
    Then the response status should be 200
    And the response should include 3 results

  Scenario: Validate optional country parameter
    Given I have the name "Meghana" and country "US"
    When I send a request to the Agify API
    Then the response status should be 200
    And the response should include the country_id "US"

  Scenario: Request with name not present in country data
    Given I have the name "Abadia Adrian" and country "BT"
    When I send a request to the Agify API
    Then the response status should be 200
    And the response should include the name "Abadia Adrian"
    And the response should include the country_id "BT"
    And the response should include the age as null