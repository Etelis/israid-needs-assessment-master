function getAttributes(tableDefinition) {
  const typesMap = {
    S: "string",
    N: "number",
    B: "binary",
  };

  return tableDefinition.AttributeDefinitions.reduce((previous, current) => {
    return {
      ...previous,
      [current.AttributeName]: typesMap[current.AttributeType],
    };
  }, {});
}

function getPartitionKey(tableDefinition) {
  return tableDefinition.KeySchema.find((k) => {
    return k.KeyType.toUpperCase() === "HASH";
  }).AttributeName;
}

function getSortKey(tableDefinition) {
  const rangeAttribute = tableDefinition.KeySchema.find((k) => {
    return k.KeyType.toUpperCase() === "RANGE";
  });
  return rangeAttribute ? rangeAttribute.AttributeName : undefined;
}

exports.dynamoSdkToToolbox = function (tableDefinition) {
  return {
    partitionKey: getPartitionKey(tableDefinition),
    attributes: getAttributes(tableDefinition),
    sortKey: getSortKey(tableDefinition),
    name: tableDefinition.TableName,
  };
};