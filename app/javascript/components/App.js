import React from 'react'
import angular from 'angular'

/** Angular.js code
 */
const angularControllers = angular.module('angularControllers', [])

angularControllers.controller('angularController1', [
  '$rootScope',
  '$scope',
  function ($rootScope, $scope) {
    $scope.text = 'angular input'

    $scope.onClick = () => {
      console.log('ctrl1 click')
      $rootScope.$emit('onClick', { data: $scope.text })
    }
  },
])

angularControllers.controller('angularController2', [
  '$rootScope',
  '$scope',
  function ($rootScope, $scope) {
    // $scope.$on('onClick', (event, args) => {
    //   console.log(event, args)
    // })

    $rootScope.$on('onClick', (event, args) => {
      $scope.text = args.data
      // console.log(event, args)
    })
  },
])

const angularApp = angular.module('angularApp', ['angularControllers'])

angularApp.run([
  '$rootScope',
  function (rootScope) {
    rootScope.$broadcast('appConfigured')
    console.log('app.run $rootScope', rootScope)
  },
])

const template = `
<div>
  <h2>{{ heading }}</h2>
  <div ng-controller="angularController1">
    <label htmlFor="ng-input">Type something here: </label>
    <input
      type="text"
      name="ng-input"
      id="ng-input"
      ng-model="text"
    ></input>
    <button ng-click="onClick()">Submit</button>
  </div>

  <div ng-controller="angularController2">
    <h4>{{ text }}</h4>
  </div>
</div>
`

/** React code
 */

const App = () => {
  const [input, setInput] = React.useState('react input')
  const ngAppRef = React.useRef(null)

  React.useEffect(() => {
    const $injector = angular.bootstrap(ngAppRef.current, ['angularApp'])
    const $rootScope = $injector.get('$rootScope')

    $rootScope.heading = 'This is an AngularJS application'
    $rootScope.$digest()

    console.log('useEffect $_rootscope:', $rootScope)

    return () => {
      console.log('destroying angular scope')
    }
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
        <div
          className="test"
          ref={ngAppRef}
          dangerouslySetInnerHTML={{ __html: template }}
        />
      </div>
    </div>
  )
}

export default App
