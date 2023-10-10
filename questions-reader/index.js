const fs = require('fs')

const rawQuestionsString = fs.readFileSync('raw-questions.json');
const rawQuestions = JSON.parse(rawQuestionsString).map((x, index) => ({...x, id: `${index + 1}`}));

const mapType = rawType => {
  if (rawType.toLowerCase() === 'yes or no') {
    return 'yes-no';
  }

  if (rawType.toLowerCase() === 'multiselection') {
    return 'multi-select';
  }

  if (rawType.toLowerCase() === 'text') {
    return 'text';
  }

  throw new Error(`Invalid type ${rawType}`);
}

const mapOptions = rawOptions => {
  if (!rawOptions) {
    return undefined;
  }

  const options = rawOptions.split(',').map(x => x.startsWith(' ') ? x.slice(1) : x);

  return options;
}

const mapExpectedAnswer = (rawExpectedAnswer) => {
  if (rawExpectedAnswer.toLowerCase() === 'yes') {
    return true;
  }

  if (rawExpectedAnswer.toLowerCase() === 'no') {
    return false;
  }

  return rawExpectedAnswer;
}

const mapDependnecies = (rawQuestion) => {
  const dependendQuestionCode = rawQuestion['Dependent on question'];

  if (!dependendQuestionCode) {
    return undefined;
  }

  console.log(dependendQuestionCode);

  const dependendQuestionId = rawQuestions.find(x => x.code === dependendQuestionCode).id;

  if (!rawQuestion['Expected Answer']) {
    throw new Error(`Invalid expected answer for ${dependendQuestionCode}`)
  }

  return {
    questionId: dependendQuestionId,
    expectedAnswer: mapExpectedAnswer(rawQuestion['Expected Answer'])
  }
}

const createCategories = () => {
  const categoriesNamesSet = rawQuestions.reduce((categories, question) => {
    categories.add(question.Category);
    return categories;
  }, new Set());
  const categoriesNames = Array.from(categoriesNamesSet);

  return categoriesNames.map((name, index) => ({
    id: `${index + 1}`,
    name,
    description: '',
    icon: ''
  }));
}

const createSubCategories = (categories) => {
  const subCategories = rawQuestions.reduce((subCategories, question) => {
    if (!subCategories.some(x => x.name === question['Sub Category'])) {
      subCategories.push({name: question['Sub Category'], categoryId: categories.find(x => x.name === question.Category).id});
    }
    return subCategories;
  }, []);

  return subCategories.map((x, index) => ({id: `${index + 1}`, ...x}));
}

const getSubCategoryId = (subCategories, subCategoryName) => {
  return subCategories.find(x => x.name === subCategoryName).id;
}

const mapToQuestion = (rawQuestion, subCategories) => ({
  title: rawQuestion.Question,
  hintText: rawQuestion["hint text"],
  subCategoryId: getSubCategoryId(subCategories, rawQuestion['Sub Category']),
  type: mapType(rawQuestion['Answer Type']),
  options: mapOptions(rawQuestion.Options),
  dependencies: mapDependnecies(rawQuestion),
  order: rawQuestion.Order
});

const main = () => {
  const categories = createCategories();
  const subCategories = createSubCategories(categories);
  const questions = rawQuestions.map(x => mapToQuestion(x, subCategories)).map((x, index) => ({id: `${index + 1}`, ...x})).sort((a, b) => {
    return (a.subCategoryId * 100 + a.order) - (b.subCategoryId * 100 + b.order) 
  }).map(({order, ...x}) => ({...x}));

  fs.writeFileSync('categories.json', JSON.stringify(categories, null, 2));
  fs.writeFileSync('sub-categories.json', JSON.stringify(subCategories, null, 2));
  fs.writeFileSync('questions.json', JSON.stringify(questions, null, 2));
}

main();