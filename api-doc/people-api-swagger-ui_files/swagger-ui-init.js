
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
      "/people/me": {
        "get": {
          "operationId": "PeopleController_getMyPerson",
          "summary": "Get person level information of the current user",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "patch": {
          "operationId": "PeopleController_update",
          "summary": "Update person level information",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdatePersonDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/people": {
        "post": {
          "operationId": "PeopleController_create",
          "summary": "Create a Person (INTERNAL)",
          "description": "This is only used by the Cognito sign-up completion trigger.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreatePersonDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "PeopleController_search",
          "summary": "Search people",
          "description": "This is normally used when a user tries to find another user to add his/her friend (contact).",
          "parameters": [
            {
              "name": "q",
              "required": false,
              "in": "query",
              "description": "Search for names, email, username and contact number.",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "description": "The maximum number of items to return",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "after",
              "required": true,
              "in": "query",
              "description": "The cursor to start the search from",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/people/{uuid}": {
        "get": {
          "operationId": "PeopleController_findOne",
          "summary": "Get details of a specific person",
          "description": "Similar to GET /people/me but to retrieve another user`s profile information.",
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
          },
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/accounts/me": {
        "get": {
          "operationId": "AccountsController_getMyAccount",
          "summary": "Get account information",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/accounts": {
        "post": {
          "operationId": "AccountsController_create",
          "summary": "Create an Account (INTERNAL)",
          "description": "This is only used by the Cognito sign-up completion trigger.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateAccountDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/accounts/{uuid}": {
        "delete": {
          "operationId": "AccountsController_remove",
          "summary": "Permanently delete the account and all records associated with it.",
          "description": "WARN - this is an irreversible operation.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RemoveAccountDto"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "Successfully requested to delete the account"
            },
            "404": {
              "description": "Account not found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
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
      "/connections": {
        "post": {
          "operationId": "ConnectionsController_create",
          "summary": "Request to connect with a target person",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RequestConnectionDto"
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
          "operationId": "ConnectionsController_getConnections",
          "summary": "Get a list of connection requests",
          "parameters": [
            {
              "name": "status",
              "required": false,
              "in": "query",
              "description": "Status filter",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "after",
              "required": true,
              "in": "query",
              "schema": {
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
      "/connections/{uuid}/accept": {
        "patch": {
          "operationId": "ConnectionsController_accept",
          "summary": "Accept a connection request",
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
      "/connections/{uuid}/reject": {
        "patch": {
          "operationId": "ConnectionsController_reject",
          "summary": "Reject a connection request",
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
      "/connections/contacts": {
        "get": {
          "operationId": "ConnectionsController_getContacts",
          "summary": "Get a list of connected people",
          "parameters": [
            {
              "name": "q",
              "required": false,
              "in": "query",
              "description": "Search for names, email, username and contact number of connected people",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "description": "The maximum number of items to return",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "after",
              "required": true,
              "in": "query",
              "description": "The cursor to start the search from",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "A list of people"
            },
            "404": {
              "description": "No matching people found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/connections/contacts/{uuid}": {
        "delete": {
          "operationId": "ConnectionsController_deleteContact",
          "summary": "Delete a connected person",
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
              "description": "Successfully deleted the contact"
            },
            "404": {
              "description": "Contact/connection not found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/chats": {
        "post": {
          "operationId": "ChatsController_create",
          "summary": "Start a new chat with a contact or a listing.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateChatDto"
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
          "operationId": "ChatsController_findAll",
          "summary": "Get a list of chats",
          "parameters": [
            {
              "name": "chatType",
              "required": false,
              "in": "query",
              "description": "Filter by the type of chats.",
              "schema": {
                "enum": [
                  "CONTACT",
                  "LISTING"
                ],
                "type": "string"
              }
            },
            {
              "name": "listingUuid",
              "required": false,
              "in": "query",
              "description": "Find all chats on a given listing. This is used for a Poster to get all chats on his/her listing or for an Offeror to get the chat on a given listing.",
              "schema": {
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
      "/chats/{chatUuid}/messages": {
        "get": {
          "operationId": "ChatsController_findMessages",
          "summary": "Get a list of messages of a given Chat based on the filters",
          "parameters": [
            {
              "name": "chatUuid",
              "required": true,
              "in": "path",
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
              "description": "Limit for the number of messages",
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
      "/messages/{wsConnId}": {
        "post": {
          "operationId": "MessagesController_create",
          "summary": "Send a Message to a Chat via WebSocket (INTERNAL)",
          "parameters": [
            {
              "name": "wsConnId",
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
                  "$ref": "#/components/schemas/CreateMessageDto"
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
      "/ws_connections": {
        "post": {
          "operationId": "WsConnectionsController_create",
          "summary": "Create a WebSocket connection (INTERNAL)",
          "description": "Each $connect route inserts a WsConnection.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateWsConnectionDto"
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
          "operationId": "WsConnectionsController_getConnections",
          "summary": "Get a list of WsConnection",
          "parameters": [
            {
              "name": "status",
              "required": false,
              "in": "query",
              "description": "Status filter",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "after",
              "required": true,
              "in": "query",
              "schema": {
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
      "/ws_connections/{wsConnId}": {
        "patch": {
          "operationId": "WsConnectionsController_update",
          "summary": "Update a WsConnection based on WebSocket connection ID (INTERNAL). The only field to be updated to status (e.g., to disconnect).",
          "parameters": [
            {
              "name": "wsConnId",
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
                  "$ref": "#/components/schemas/UpdateWsConnectionDto"
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
      "/assets": {
        "post": {
          "operationId": "AssetsController_create",
          "summary": "Create an asset",
          "description": "Create an asset is required before the asset binary can be uploaded. The `uploadUrl` returned is a pre-signed S3 URL for uploading the file.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateAssetDto"
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
          "operationId": "AssetsController_findAll",
          "summary": "Get a list of assets by parentId and parentType. The field `presignedDownloadUrl` in the response is a short-lived secure URL to download the binary from CloudFront CDN.",
          "parameters": [
            {
              "name": "parentType",
              "required": true,
              "in": "query",
              "description": "Parent type such as PERSON, MESSAGE, EXPERIENCE or LISTING",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "parentUuid",
              "required": true,
              "in": "query",
              "description": "Parent UUID that corresponds to the parentType",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "variation",
              "required": false,
              "in": "query",
              "description": "Image variation (e.g. different sizes) such as thumbnail, small, medium, large",
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
      "/assets/{uuid}": {
        "delete": {
          "operationId": "AssetsController_remove",
          "summary": "Delete an asset",
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
              "description": "Successfully deleted the asset"
            },
            "404": {
              "description": "Asset not found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/experiences": {
        "post": {
          "operationId": "ExperiencesController_create",
          "summary": "Post an experience",
          "description": "Asset should be linked to the experience with asset endpoint.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateExperienceDto"
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
          "operationId": "ExperiencesController_findAll",
          "summary": "Get a list of experiences that are visible to the current user (e.g. own or public or contacts' experiences) and are satisfied by the filters.",
          "parameters": [
            {
              "name": "createdAtStart",
              "required": false,
              "in": "query",
              "description": "Start date for the createdAt filter",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "createdAtEnd",
              "required": false,
              "in": "query",
              "description": "End date for the createdAt filter",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "personUuid",
              "required": false,
              "in": "query",
              "description": "Experience poster's UUID. This can be used to retrieve experiences for a given user given the experience is also visible for the current user.",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Limit for the number of experiences",
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
      "/experiences/{uuid}": {
        "get": {
          "operationId": "ExperiencesController_findOne",
          "summary": "Get details of a specific experience",
          "description": "It checks if the current user is authorised to view the requested experience.",
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
        },
        "delete": {
          "operationId": "ExperiencesController_remove",
          "summary": "Delete an experience.",
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
              "description": "Successfully deleted the experience"
            },
            "404": {
              "description": "Experience not found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/experiences/{experienceUuid}/experience_reactions": {
        "post": {
          "operationId": "ExperiencesController_createReaction",
          "summary": "Post a reaction on an experience",
          "description": "Reaction could be a comment with content or like (click) or other responses.",
          "parameters": [
            {
              "name": "experienceUuid",
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
                  "$ref": "#/components/schemas/CreateExperienceReactionDto"
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
          "operationId": "ExperiencesController_findAllReactions",
          "summary": "Get all the experience reactions of the given experience that are visible to the current user (e.g. own reactions or reactions from contacts).",
          "parameters": [
            {
              "name": "experienceUuid",
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
      "/experiences/{experienceUuid}/experience_reactions/{uuid}": {
        "delete": {
          "operationId": "ExperiencesController_removeReaction",
          "summary": "Delete an experience reaction.",
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
              "description": "Successfully deleted the experience reaction"
            },
            "404": {
              "description": "Experience reaction not found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/devices": {
        "post": {
          "operationId": "DevicesController_create",
          "summary": "Register a device",
          "description": "Push token is part of Device information.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateDeviceDto"
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
      }
    },
    "info": {
      "title": "Peopel API",
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
        "CreatePersonDto": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string"
            },
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "contactNumber": {
              "type": "string"
            },
            "birthDate": {
              "type": "string"
            },
            "location": {
              "type": "string"
            },
            "bio": {
              "type": "string"
            },
            "accountUuid": {
              "type": "string"
            }
          },
          "required": [
            "username",
            "email",
            "accountUuid"
          ]
        },
        "UpdatePersonDto": {
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string",
              "description": "First name"
            },
            "lastName": {
              "type": "string",
              "description": "Last name"
            },
            "contactNumber": {
              "type": "string",
              "description": "Phone number"
            },
            "birthDate": {
              "type": "string",
              "description": "Date of birth"
            },
            "location": {
              "type": "string",
              "description": "Location - surburb"
            },
            "bio": {
              "type": "string",
              "description": "Bio - brief introduction of the user"
            }
          }
        },
        "CreateAccountDto": {
          "type": "object",
          "properties": {
            "cognitoUserId": {
              "type": "string",
              "description": "User ID from Cognito user pool"
            },
            "accountStatus": {
              "type": "string",
              "description": "Account status",
              "enum": [
                "PENDING",
                "ACTIVE",
                "BLOCKED",
                "DISABLED"
              ]
            }
          },
          "required": [
            "cognitoUserId"
          ]
        },
        "RemoveAccountDto": {
          "type": "object",
          "properties": {
            "confirm": {
              "type": "string",
              "description": "Confirmation message to avoid mistakenly deleting account. The words must be 'Permanently delete my account' for the request to be processed. "
            },
            "reason": {
              "type": "string",
              "description": "Reason for closing the account"
            }
          },
          "required": [
            "confirm"
          ]
        },
        "RequestConnectionDto": {
          "type": "object",
          "properties": {
            "personUuid": {
              "type": "string",
              "description": "UUID of the person the connection request is sent to"
            }
          },
          "required": [
            "personUuid"
          ]
        },
        "CreateChatDto": {
          "type": "object",
          "properties": {
            "chatType": {
              "type": "string",
              "description": "Specify the context of the chat - e.g. is it for chat between connected people or public message about a listing",
              "enum": [
                "CONTACT",
                "LISTING"
              ]
            },
            "receiverPersonUuid": {
              "type": "string",
              "description": "For ChatType CONTACT, the contact person UUID"
            },
            "listingUuid": {
              "type": "string",
              "description": "For ChatType LISTING, the listing UUID"
            }
          },
          "required": [
            "chatType"
          ]
        },
        "CreateMessageDto": {
          "type": "object",
          "properties": {
            "chatUuid": {
              "type": "string"
            },
            "uuid": {
              "type": "string"
            },
            "messageContent": {
              "type": "string"
            },
            "assetUuids": {
              "description": "An array of asset UUIDs",
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "chatUuid",
            "messageContent"
          ]
        },
        "CreateWsConnectionDto": {
          "type": "object",
          "properties": {
            "wsConnId": {
              "type": "string"
            }
          },
          "required": [
            "wsConnId"
          ]
        },
        "UpdateWsConnectionDto": {
          "type": "object",
          "properties": {
            "status": {
              "type": "string",
              "description": "Status",
              "enum": [
                "CONNECTED",
                "DISCONNECTED"
              ]
            }
          }
        },
        "CreateAssetDto": {
          "type": "object",
          "properties": {
            "parentType": {
              "type": "string",
              "description": "Asset parent type",
              "enum": [
                "PERSON",
                "CHAT",
                "MESSAGE",
                "EXPERIENCE",
                "LISTING"
              ]
            },
            "parentUuid": {
              "type": "string",
              "description": "UUID of the parent object that the asset is attached to"
            },
            "mimeType": {
              "type": "string",
              "description": "MIME type, e.g. image/jpeg, image/png, image/webp"
            }
          },
          "required": [
            "parentType",
            "parentUuid",
            "mimeType"
          ]
        },
        "CreateExperienceDto": {
          "type": "object",
          "properties": {
            "content": {
              "type": "string",
              "description": "The experience's text description part."
            },
            "visibility": {
              "type": "string",
              "description": "Indicate whether the experience is visible to everyone or only contacts.",
              "enum": [
                "PUBLIC",
                "CONTACT_ONLY"
              ]
            }
          },
          "required": [
            "content",
            "visibility"
          ]
        },
        "CreateExperienceReactionDto": {
          "type": "object",
          "properties": {
            "reactionType": {
              "type": "string",
              "description": "Indicate whether the reaction is a comment or a like.",
              "enum": [
                "COMMENT",
                "LIKE"
              ]
            },
            "content": {
              "type": "string",
              "description": "The message content of a comment."
            }
          },
          "required": [
            "reactionType"
          ]
        },
        "CreateDeviceDto": {
          "type": "object",
          "properties": {
            "deviceType": {
              "type": "string",
              "description": "Device type",
              "enum": [
                "PHONE",
                "TABLET",
                "WEARABLE",
                "BROWSER",
                "DESKTOP",
                "OTHER"
              ]
            },
            "platformType": {
              "type": "string",
              "description": "Platform type",
              "enum": [
                "IOS",
                "ANDROID",
                "WEB",
                "WINDOWS",
                "MACOS",
                "LINUX",
                "OTHER"
              ]
            },
            "platformVersion": {
              "type": "string",
              "description": "Platform version. For example, iOS 16.6.1."
            },
            "modelName": {
              "type": "string",
              "description": "Model type. For example, iPhone 15 Pro."
            },
            "pushToken": {
              "type": "string",
              "description": "Push token (assign by APN or FCM for an app in a device) to deliver push notification."
            }
          },
          "required": [
            "deviceType",
            "platformType",
            "platformVersion",
            "modelName",
            "pushToken"
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
