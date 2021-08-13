import React, {
  lazy,
  Suspense,
} from 'react'
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

const A = lazy(() => import('./a'))
// import A from './a'
import B from './b'

export default () => {
  return (
    <Switch>
      <Route exact path="/" >
        <Redirect to="/b" />
      </Route>
      <Suspense fallback={<div>loading...</div>}>
        <Route path="/a" component={A} />
        <Route path="/b" component={B} />
      </Suspense>
    </Switch>
  )
}