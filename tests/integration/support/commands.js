import { apiRequestHeaders } from './utils'

Cypress.Commands.add('get_access_token', () => {
  cy.request({
    url: Cypress.env('API_BASE_URL') + '/oauth/token',
    method: 'POST',
    body: {
      grant_type: 'client_credentials',
      client_id: Cypress.env('API_CLIENT_ID'),
      client_secret: Cypress.env('API_CLIENT_SECRET')
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).its('body.access_token')
})

Cypress.Commands.add('create_order', options => {
  cy.get_access_token().then(accessToken => {
    cy.request({
      url: Cypress.env('API_BASE_URL') + '/api/orders',
      method: 'POST',
      body: {
        data: {
          type: 'orders',
          relationships: {
            market: {
              data: {
                type: 'markets',
                id: options.market_id
              }
            }
          }
        }
      },
      headers: apiRequestHeaders(accessToken)
    }).its('body.data')
  })
})

Cypress.Commands.add('create_line_item', options => {
  cy.get_access_token().then(accessToken => {
    cy.request({
      url: Cypress.env('API_BASE_URL') + '/api/line_items',
      method: 'POST',
      body: {
        data: {
          type: 'line_items',
          attributes: {
            sku_code: options.sku_code,
            quantity: options.quantity
          },
          relationships: {
            order: {
              data: {
                type: 'orders',
                id: options.order_id
              }
            }
          }
        }
      },
      headers: apiRequestHeaders(accessToken)
    }).its('body.data')
  })
})

Cypress.Commands.add('update_stock_item', options => {
  cy.get_access_token().then(accessToken => {
    cy.request({
      url:
        Cypress.env('API_BASE_URL') +
        '/api/stock_items/' +
        options.stock_item_id,
      method: 'PATCH',
      body: {
        data: {
          type: 'stock_items',
          id: options.stock_item_id,
          attributes: {
            quantity: options.quantity
          }
        }
      },
      headers: apiRequestHeaders(accessToken)
    }).its('body.data')
  })
})

Cypress.Commands.add('update_price', options => {
  cy.get_access_token().then(accessToken => {
    cy.request({
      url: Cypress.env('API_BASE_URL') + '/api/prices/' + options.price_id,
      method: 'PATCH',
      body: {
        data: {
          type: 'prices',
          id: options.price_id,
          attributes: {
            amount_cents: options.amount_cents
          }
        }
      },
      headers: apiRequestHeaders(accessToken)
    }).its('body.data')
  })
})

Cypress.Commands.add('update_order', options => {
  cy.get_access_token().then(accessToken => {
    cy.request({
      url: Cypress.env('API_BASE_URL') + '/api/orders/' + options.order_id,
      method: 'PATCH',
      body: {
        data: {
          type: 'orders',
          id: options.order_id,
          attributes: options.attributes,
          relationships: options.relationships
        }
      },
      headers: apiRequestHeaders(accessToken)
    }).its('body.data')
  })
})

Cypress.Commands.add('create_address', options => {
  cy.get_access_token().then(accessToken => {
    cy.request({
      url: Cypress.env('API_BASE_URL') + '/api/addresses',
      method: 'POST',
      body: {
        data: {
          type: 'addresses',
          attributes: options.attributes
        }
      },
      headers: apiRequestHeaders(accessToken)
    }).its('body.data')
  })
})

Cypress.Commands.add('get_order', options => {
  cy.get_access_token().then(accessToken => {
    cy.request({
      url: Cypress.env('API_BASE_URL') + '/api/orders/' + options.order_id,
      method: 'GET',
      headers: apiRequestHeaders(accessToken)
    }).its('body')
  })
})