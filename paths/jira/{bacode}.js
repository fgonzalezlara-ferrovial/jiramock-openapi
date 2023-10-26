import mockDatabaseInstance from "../../database.js";

export default function () {
  let operations = {
    GET,
    PUT,
    DELETE,
  };

  function GET(req, res, next) {
    const ba = mockDatabaseInstance.getOne(req.params.bacode);
    res.status(200).json(ba);
  }

  function PUT(req, res, next) {
    const data = req.body;
    const updatedBA = mockDatabaseInstance.updateBA(req.params.bacode, data);
    res.status(200).json(updatedBA);
  }

  function DELETE(req, res, next) {
    mockDatabaseInstance.deleteBA(req.params.bacode);
    res.status(204).send();
  }

  GET.apiDoc = {
    summary: "Returns a single BA",
    operationId: "getOneBA",
    parameters: [
      {
        name: "bacode",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      200: {
        description: "BA data",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/BusinessApplication",
            },
          },
        },
      },
    },
  };

  PUT.apiDoc = {
    summary: "Updates an existing BA",
    operationId: "updateBA",
    parameters: [
      {
        name: "bacode",
        in: "path",
        schema: {
          type: "string",
        },
        required: true,
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/BusinessApplication",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Updated BA",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/BusinessApplication",
            },
          },
        },
      },
    },
  };

  DELETE.apiDoc = {
    summary: "Deletes an existing BA",
    operationId: "deleteBA",
    parameters: [
      {
        name: "bacode",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      204: {
        description: "No content",
        content: {},
      },
    },
  };

  return operations;
}
