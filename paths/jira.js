import mockDatabaseInstance from "../database.js";

export default function () {
  let operations = {
    GET,
    POST,
  };

  function GET(req, res, next) {
    res.status(200).json(mockDatabaseInstance.getAll());
  }

  function POST(req, res, next) {
    const data = req.body;
    mockDatabaseInstance.addBA(data);
    res.status(201).json(mockDatabaseInstance.getAll());
  }

  GET.apiDoc = {
    summary: "Returns list of BAs",
    operationId: "getBAs",
    responses: {
      200: {
        description: "List of BAs",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/BusinessApplication",
              },
            },
          },
        },
      },
    },
  };
  POST.apiDoc = {
    summary: "Creates a new BA",
    operationId: "createBA",
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
      201: {
        description: "Newly created BA",
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

  return operations;
}
