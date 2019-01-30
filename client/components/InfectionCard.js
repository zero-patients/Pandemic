import React from 'react'
import 'uikit/dist/css/uikit.css'

const InfectionCard = props => {
  return (
    <div className="uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid>
      <div>
        <div className="uk-card uk-card-default uk-card-body">
          <h3 className="uk-card-title">Default</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </div>
      <div>
        <div className="uk-card uk-card-primary uk-card-body">
          <h3 className="uk-card-title">Primary</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </div>
      <div>
        <div className="uk-card uk-card-secondary uk-card-body">
          <h3 className="uk-card-title">Secondary</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </div>
    </div>
  )
}

export default InfectionCard
