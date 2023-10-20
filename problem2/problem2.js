const fs = require('fs').promises;

async function readFileAndConvert(filename, transformFunction, outputFilename) {
  try {
    const data = await fs.readFile(filename, 'utf-8');
    const transformedContent = transformFunction(data);
    await fs.writeFile(outputFilename, transformedContent);
    return outputFilename;
  } catch (error) {
    throw new Error(`Error in ${transformFunction.name}: ${error.message}`);
  }
}

async function splitAndWriteSentences(inputFilename, outputDirectory) {
  try {
    const data = await fs.readFile(inputFilename, 'utf-8');
    const sentences = data.split(/[.!?]/).map(sentence => sentence.trim());
    const sentenceFiles = [];

    for (let i = 0; i < sentences.length; i++) {
      if (sentences[i].length > 0) {
        const filename = `${outputDirectory}/sentence_${i + 1}.txt`;
        await fs.writeFile(filename, sentences[i]);
        sentenceFiles.push(filename);
      }
    }

    return sentenceFiles;
  } catch (error) {
    throw new Error(`Error in splitAndWriteSentences: ${error.message}`);
  }
}

async function readFilesAndSort(inputFiles, outputFilename) {
  try {
    const contentPromises = inputFiles.map(filename => fs.readFile(filename, 'utf-8'));
    const contents = await Promise.all(contentPromises);
    const sortedContent = contents.sort().join('\n');
    await fs.writeFile(outputFilename, sortedContent);
    return outputFilename;
  } catch (error) {
    throw new Error(`Error in readFilesAndSort: ${error.message}`);
  }
}

async function deleteFiles(filenames) {
  const deletionPromises = filenames.map(filename => {
    if (filename) {
      return fs.unlink(filename).then(() => `Deleted: ${filename}`).catch(err => `Error deleting ${filename}: ${err.message}`);
    }
  });

  const deletionResults = await Promise.all(deletionPromises);

  console.log(deletionResults.join('\n'));
}

async function main() {
  try {
    await readFileAndConvert('lipsum.txt', data => data.toUpperCase(), 'uppercase.txt');
    const sentenceFiles = await splitAndWriteSentences('uppercase.txt', 'problem2');
    await readFilesAndSort(sentenceFiles, 'sorted.txt');
    const filenames = [ 'uppercase.txt', 'sorted.txt', ...sentenceFiles, 'lipsum.txt' ];
    await deleteFiles(filenames);

    console.log('All tasks completed successfully.');
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

main();
