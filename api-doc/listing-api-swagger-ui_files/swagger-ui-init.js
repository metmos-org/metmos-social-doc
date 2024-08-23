
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/health": {
        "get": {
          "operationId": "HealthController_check",
          "summary": "Health check endpoint used by the load balancer. Not to be called by the app. (INTERNAL)",
          "parameters": [],
          "responses": {
            "200": {
              "description": "The Health Check is successful",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "string",
                        "example": "ok"
                      },
                      "info": {
                        "type": "object",
                        "example": {
                          "database": {
                            "status": "up"
                          }
                        },
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "status": {
                              "type": "string"
                            }
                          },
                          "additionalProperties": {
                            "type": "string"
                          }
                        },
                        "nullable": true
                      },
                      "error": {
                        "type": "object",
                        "example": {},
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "status": {
                              "type": "string"
                            }
                          },
                          "additionalProperties": {
                            "type": "string"
                          }
                        },
                        "nullable": true
                      },
                      "details": {
                        "type": "object",
                        "example": {
                          "database": {
                            "status": "up"
                          }
                        },
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "status": {
                              "type": "string"
                            }
                          },
                          "additionalProperties": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "503": {
              "description": "The Health Check is not successful",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "string",
                        "example": "error"
                      },
                      "info": {
                        "type": "object",
                        "example": {
                          "database": {
                            "status": "up"
                          }
                        },
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "status": {
                              "type": "string"
                            }
                          },
                          "additionalProperties": {
                            "type": "string"
                          }
                        },
                        "nullable": true
                      },
                      "error": {
                        "type": "object",
                        "example": {
                          "redis": {
                            "status": "down",
                            "message": "Could not connect"
                          }
                        },
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "status": {
                              "type": "string"
                            }
                          },
                          "additionalProperties": {
                            "type": "string"
                          }
                        },
                        "nullable": true
                      },
                      "details": {
                        "type": "object",
                        "example": {
                          "database": {
                            "status": "up"
                          },
                          "redis": {
                            "status": "down",
                            "message": "Could not connect"
                          }
                        },
                        "additionalProperties": {
                          "type": "object",
                          "properties": {
                            "status": {
                              "type": "string"
                            }
                          },
                          "additionalProperties": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/listings": {
        "post": {
          "operationId": "ListingsController_create",
          "summary": "Create a listing",
          "description": "Create a listing with basic information and saved as Draft status. The listing with draft status can be edited, removed or published.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateListingDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          }
        },
        "get": {
          "operationId": "ListingsController_findAll",
          "summary": "Get a list of listings that are visible to the public and satisfied by the filters. This is used for a logged user to browser and search public listings.",
          "parameters": [
            {
              "name": "q",
              "required": false,
              "in": "query",
              "description": "Full text search on listing title and description",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "listingType",
              "required": false,
              "in": "query",
              "description": "Match any of the listing types in the array. For example, to get only Item: listingType=ITEM_SALE&listingType=ITEM_PURCHASE",
              "schema": {
                "type": "array",
                "items": {
                  "type": "string",
                  "enum": [
                    "ITEM_SALE",
                    "ITEM_PURCHASE",
                    "SERVICE_SALE",
                    "SERVICE_PURCHASE"
                  ]
                }
              }
            },
            {
              "name": "personUuid",
              "required": false,
              "in": "query",
              "description": "Person uuid - the owner of the listing. For example, find all the listings posted a given user (current user or another user)",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "updatedAtStart",
              "required": false,
              "in": "query",
              "description": "Start date for the updatedAt filter",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "updatedAtEnd",
              "required": false,
              "in": "query",
              "description": "End date for the updatedAt filter",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Limit for the number of listings",
              "schema": {
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "after",
              "required": false,
              "in": "query",
              "description": "Cursor to start from",
              "schema": {
                "default": -1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/listings/{uuid}": {
        "patch": {
          "operationId": "ListingsController_update",
          "summary": "Update listing's editable fields",
          "parameters": [
            {
              "name": "uuid",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateListingDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          }
        },
        "delete": {
          "operationId": "ListingsController_remove",
          "summary": "Delete a listing.",
          "description": "Only the owner can delete it.",
          "parameters": [
            {
              "name": "uuid",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "Successfully deleted the listing"
            },
            "404": {
              "description": "Listing not found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "get": {
          "operationId": "ListingsController_findOne",
          "summary": "Get details of a specific listing",
          "description": "As all listings are public at this time, this is accessible for every logged user.",
          "parameters": [
            {
              "name": "uuid",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/listings/{uuid}/publish": {
        "patch": {
          "operationId": "ListingsController_publish",
          "summary": "Publish a listing from Draft status",
          "parameters": [
            {
              "name": "uuid",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/listings/{uuid}/unpublish": {
        "patch": {
          "operationId": "ListingsController_unpublish",
          "summary": "Unpublish a listing (take it offline)",
          "parameters": [
            {
              "name": "uuid",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/listings/{uuid}/cancel": {
        "patch": {
          "operationId": "ListingsController_cancel",
          "summary": "Cancel a listing (ends the listing as it is no longer required)",
          "parameters": [
            {
              "name": "uuid",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/listings/mine": {
        "get": {
          "operationId": "ListingsController_findAllMine",
          "summary": "My listings - return listings posted by the current user. Used for listing management.",
          "parameters": [
            {
              "name": "q",
              "required": false,
              "in": "query",
              "description": "Full text search on listing title and description",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "listingType",
              "required": false,
              "in": "query",
              "description": "Match any of the listing types in the array. For example, to get only Item: listingType=ITEM_SALE&listingType=ITEM_PURCHASE",
              "schema": {
                "type": "array",
                "items": {
                  "type": "string",
                  "enum": [
                    "ITEM_SALE",
                    "ITEM_PURCHASE",
                    "SERVICE_SALE",
                    "SERVICE_PURCHASE"
                  ]
                }
              }
            },
            {
              "name": "updatedAtStart",
              "required": false,
              "in": "query",
              "description": "Start date for the updatedAt filter",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "updatedAtEnd",
              "required": false,
              "in": "query",
              "description": "End date for the updatedAt filter",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Limit for the number of listings",
              "schema": {
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "after",
              "required": false,
              "in": "query",
              "description": "Cursor to start from",
              "schema": {
                "default": -1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/categories": {
        "get": {
          "operationId": "CategoriesController_findAll",
          "summary": "Get a list of pre-defined categories.",
          "parameters": [
            {
              "name": "categoryType",
              "required": false,
              "in": "query",
              "schema": {
                "enum": [
                  "ITEM",
                  "SERVICE"
                ],
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/wallets": {
        "post": {
          "operationId": "WalletsController_create",
          "summary": "Register a connected wallet",
          "description": "Register a wallet after the app is connected with a crypto wallet on the frontend so the backend can link a wallet with a person.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateWalletDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          }
        }
      },
      "/wallets/{uuid}": {
        "delete": {
          "operationId": "WalletsController_remove",
          "summary": "Unregister a wallet.",
          "description": "Unregister the wallet after the app is disconnected with the crypto wallet.",
          "parameters": [
            {
              "name": "uuid",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "Successfully unregistered the wallet"
            },
            "404": {
              "description": "Wallet not found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/wallets/mine": {
        "get": {
          "operationId": "WalletsController_findMine",
          "summary": "Return the wallet registered by the current user.",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/orders": {
        "post": {
          "operationId": "OrdersController_create",
          "summary": "Create an order",
          "description": "Order should be created right before payment is made. Order must be created by Payer.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateOrderDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          }
        }
      },
      "/orders/{uuid}/complete": {
        "patch": {
          "operationId": "OrdersController_complete",
          "summary": "Complete an order",
          "description": "The payer completes a paid order. This essentially releases funds to the payee and mark the listing/offer/order as completed.",
          "parameters": [
            {
              "name": "uuid",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/orders/{uuid}/cancel": {
        "patch": {
          "operationId": "OrdersController_cancel",
          "summary": "Cancel an order",
          "description": "The payer can cancel a paid order. Cancellation triggers refund to the payee and mark the offer and order as cancelled.",
          "parameters": [
            {
              "name": "uuid",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/notifications": {
        "get": {
          "operationId": "NotificationsController_findAll",
          "summary": "Get notifications for the current user",
          "parameters": [
            {
              "name": "notificationCategory",
              "required": false,
              "in": "query",
              "description": "Match any of the notification categories in the array.",
              "schema": {
                "type": "array",
                "items": {
                  "type": "string",
                  "enum": [
                    "TRADE",
                    "SOCIAL"
                  ]
                }
              }
            },
            {
              "name": "updatedAtStart",
              "required": false,
              "in": "query",
              "description": "Start date for the updatedAt filter",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "updatedAtEnd",
              "required": false,
              "in": "query",
              "description": "End date for the updatedAt filter",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Limit for the number of listings",
              "schema": {
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "after",
              "required": false,
              "in": "query",
              "description": "Cursor to start from",
              "schema": {
                "default": -1,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/ethereum/alchemy-webhook": {
        "post": {
          "operationId": "EthereumController_create",
          "summary": "Alchemy webhook notification (INTERNAL)",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/offers": {
        "post": {
          "operationId": "OffersController_create",
          "summary": "Make an offer",
          "description": "Make an offer on a published listing.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateOfferDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          }
        },
        "get": {
          "operationId": "OffersController_findAll",
          "summary": "Get a list of offers based on filters.",
          "parameters": [
            {
              "name": "listingUuid",
              "required": false,
              "in": "query",
              "description": "Listing UUID. For example, find all the offers of the given listing.",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "personUuid",
              "required": false,
              "in": "query",
              "description": "Person UUID. For example, find all the offers made by the given person.",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/offers/{uuid}": {
        "patch": {
          "operationId": "OffersController_update",
          "summary": "Update offer's editable fields",
          "parameters": [
            {
              "name": "uuid",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateOfferDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/offers/{uuid}/accept": {
        "patch": {
          "operationId": "OffersController_accept",
          "summary": "Accept an offer",
          "description": "The poster can invoke this endpoint to accept an offer.",
          "parameters": [
            {
              "name": "uuid",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/offers/{uuid}/cancel": {
        "patch": {
          "operationId": "OffersController_cancel",
          "summary": "Cancel an offer",
          "parameters": [
            {
              "name": "uuid",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/offers/mine": {
        "get": {
          "operationId": "OffersController_findAllMine",
          "summary": "Get all offers made by the current user. Used for offer management.",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      }
    },
    "info": {
      "title": "Listing API",
      "description": "",
      "version": "1.0",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "securitySchemes": {
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "AdditionalFields": {
          "type": "object",
          "properties": {
            "serviceDate": {
              "format": "date-time",
              "type": "string",
              "description": "The date the service is to be delivered"
            },
            "condition": {
              "type": "string",
              "description": "Condition of the item"
            }
          }
        },
        "CreateLocationDto": {
          "type": "object",
          "properties": {
            "suburb": {
              "type": "string",
              "description": "Suburb"
            },
            "state_region": {
              "type": "string",
              "description": "State or region"
            },
            "country": {
              "type": "string",
              "description": "Country"
            }
          },
          "required": [
            "suburb",
            "state_region",
            "country"
          ]
        },
        "CreateListingDto": {
          "type": "object",
          "properties": {
            "listingType": {
              "type": "string",
              "description": "Listing can be physical item to sell (e.g. old fridge to sell) or to buy (looking for a cot) or a job (e.g. clean my house) wanted to be done or a job that can be offered (e.g. I can paint your wall). So there are 4 types of listings, with intention to buy, sell, offering services and seeking jobs",
              "enum": [
                "ITEM_SALE",
                "ITEM_PURCHASE",
                "SERVICE_SALE",
                "SERVICE_PURCHASE"
              ]
            },
            "serviceDelivery": {
              "type": "string",
              "description": "If listingType is Service, this field indicates if the service is Online or In Person",
              "enum": [
                "IN_PERSON",
                "ONLINE"
              ]
            },
            "title": {
              "type": "string",
              "description": "Title"
            },
            "description": {
              "type": "string",
              "description": "Listing details"
            },
            "price": {
              "type": "string",
              "description": "Price of the listing in the specified currency"
            },
            "currencyType": {
              "type": "string",
              "description": "Only Crypto currency is supported at this time.",
              "enum": [
                "CRYPTO",
                "FIAT"
              ]
            },
            "currency": {
              "type": "string",
              "description": "Only Ethereum is supported at this time.",
              "enum": [
                "ETH"
              ]
            },
            "categoryUuid": {
              "type": "string",
              "description": "Category UUID to associate the listing with a category."
            },
            "additionalFields": {
              "description": "Additional fields specific to the listing type",
              "allOf": [
                {
                  "$ref": "#/components/schemas/AdditionalFields"
                }
              ]
            },
            "location": {
              "description": "Location for in person listing",
              "allOf": [
                {
                  "$ref": "#/components/schemas/CreateLocationDto"
                }
              ]
            }
          },
          "required": [
            "listingType",
            "title",
            "description",
            "price",
            "currencyType",
            "currency",
            "categoryUuid"
          ]
        },
        "UpdateLocationDto": {
          "type": "object",
          "properties": {
            "suburb": {
              "type": "string",
              "description": "Suburb"
            },
            "state_region": {
              "type": "string",
              "description": "State or region"
            },
            "country": {
              "type": "string",
              "description": "Country"
            }
          },
          "required": [
            "suburb",
            "state_region",
            "country"
          ]
        },
        "UpdateListingDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "Title"
            },
            "description": {
              "type": "string",
              "description": "Listing details"
            },
            "price": {
              "type": "string",
              "description": "Price of the listing in the specified currency"
            },
            "additionalFields": {
              "description": "Additional fields specific to the listing type",
              "allOf": [
                {
                  "$ref": "#/components/schemas/AdditionalFields"
                }
              ]
            },
            "location": {
              "$ref": "#/components/schemas/UpdateLocationDto"
            }
          }
        },
        "CreateWalletDto": {
          "type": "object",
          "properties": {
            "chain": {
              "type": "string",
              "description": "The blockchain this wallet/account is associated with, such as Ethereum.",
              "enum": [
                "ETHEREUM"
              ]
            },
            "walletType": {
              "type": "string",
              "description": "The crypto wallet, such as MetaMask.",
              "enum": [
                "METAMASK"
              ]
            },
            "network": {
              "type": "string",
              "description": "The blockchain network, such as Ethereum Mainnet, Sepolia."
            },
            "balance": {
              "type": "string",
              "description": "The balance of the connected address."
            },
            "currency": {
              "type": "string",
              "description": "Currency of the connected account.",
              "enum": [
                "ETH"
              ]
            },
            "address": {
              "type": "string",
              "description": "The public address of the connected account, such as Ethereum address 0x5cE074129204d97AF5E9565D6bd8c14A1E84CFaF."
            }
          },
          "required": [
            "chain",
            "walletType",
            "network",
            "balance",
            "currency",
            "address"
          ]
        },
        "CreateOrderDto": {
          "type": "object",
          "properties": {
            "offerUuid": {
              "type": "string",
              "description": "Offer UUID this order is linked with."
            }
          },
          "required": [
            "offerUuid"
          ]
        },
        "CreateOfferDto": {
          "type": "object",
          "properties": {
            "listingUuid": {
              "type": "string",
              "description": "The UUID of the listing the offer is made on"
            },
            "price": {
              "type": "string",
              "description": "Price of the offer (currency is provided by the listing)"
            },
            "comment": {
              "type": "string",
              "description": "Addtional message from the offeror about the offer"
            }
          },
          "required": [
            "listingUuid",
            "price"
          ]
        },
        "UpdateOfferDto": {
          "type": "object",
          "properties": {
            "price": {
              "type": "string",
              "description": "Price of the offer (currency is provided by the listing)"
            },
            "comment": {
              "type": "string",
              "description": "Addtional message from the offeror about the offer"
            }
          },
          "required": [
            "price",
            "comment"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
