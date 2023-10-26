function mockDatabase() {
  const dataStore = [];

  function baExists(bacode) {
    return dataStore.findIndex((value) => value.bacode === bacode) !== -1;
  }

  function addBA(data) {
    if (baExists(data.bacode)) {
      // user already exists, let's throw an error
      throw new Error("BA already exists.");
    }
    dataStore.push(data);
  }

  function updateBA(bacode, data) {
    if (!baExists(bacode)) {
      // user does not exist, let's throw an error
      throw new Error(`No BA with BACODE ${bacode} was found`);
    }
    const index = dataStore.findIndex((value) => value.bacode === bacode);
    const updatedBa = {
      ...dataStore[index],
      ...data,
      bacode,
    };
    dataStore.splice(index, 1, updatedBa);
    return updatedBa;
  }

  function deleteBA(bacode) {
    if (!baExists(bacode)) {
      // user does not exist, let's throw an error
      throw new Error(`No BA with BACODE ${bacode} was found`);
    }
    dataStore.splice(
      dataStore.findIndex((value) => value.bacode === bacode),
      1
    );
  }

  function getAll() {
    return dataStore;
  }

  function getOne(bacode) {
    if (!baExists(bacode)) {
      // user does not exist, let's throw an error
      throw new Error(`No BA with BACODE ${bacode} was found`);
    }
    return dataStore.find((value) => value.bacode === bacode);
  }

  return {
    addBA,
    updateBA,
    deleteBA,
    getAll,
    getOne,
  };
}

const mockDatabaseInstance = mockDatabase();

export default mockDatabaseInstance;
