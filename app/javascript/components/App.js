import React from 'react'
import angular from 'angular'

// console.log(angular)

/** Angular.js code
 */

const angularApp = angular.module('angularApp', [])

angularApp.controller('appController', [
  '$scope',
  function ($scope) {
    $scope.text = 'angular input'
  },
])

const template = `
  <div ng-controller="appController">
    <label htmlFor="ng-input">Type something here: </label>
    <input
      type="text"
      name="ng-input"
      id="ng-input"
      ng-model="text"
    ></input>
  </div>
`

/** React code
 */

const App = () => {
  const [input, setInput] = React.useState('react input')
  const ngAppRef = React.useRef(null)

  React.useEffect(() => {
    angular.bootstrap(ngAppRef.current, ['angularApp'])
  }, [])

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  return (
    <div>
      <h2>React Root</h2>

      <div style={{ margin: 12 }}>
        <label htmlFor="react-input">Type something here: </label>
        <input
          type="text"
          name="react-input"
          id="react-input"
          value={input}
          onChange={handleChange}
        ></input>
      </div>

      <div style={{ margin: 12 }}>
        <div ref={ngAppRef} dangerouslySetInnerHTML={{ __html: template }} />
      </div>
    </div>
  )
}

export default App
