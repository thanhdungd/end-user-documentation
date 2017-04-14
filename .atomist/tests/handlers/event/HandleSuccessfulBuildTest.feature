Feature: HandleSuccessfulBuild handler handles passed build events
  The HandleSuccessfulBuild event handler should
  respond with the appropriate message.

  Scenario: Executing a passed build event handler
    Given the HandleSuccessfulBuild is registered
    When a new Build is received
    Then the event handler should respond with a message
    Then that message should be sent to the general channel
    Then that message should contain the link to the build
