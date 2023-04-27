import React, { Component } from 'react';

import SideMenu from '../components/SideMenu';
import Breadcrumb from '../components/Breadcrumb';

class NotFound extends Component {
  render() {
    return (
      <>
        <SideMenu />
        <div
          className="container-page"
          data-testid="page-not-found"
        >
          <div className="row justify-content-center align-items-center mt-3">
            <div className="col-12 col-md-8">
              <Breadcrumb route="Página não encontrada" />
              <hr />

              <h1>Ops, 404. Not Found</h1>

            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NotFound;
