import "./App.css";
import "./styles.css";
import { Component } from "react";
import Axios from "axios";
import ImageUploader from "./component/index.js";

function App() {
  return (
    <div>
      <Intro />
      <CompFace />
    </div>
  );
}

const Intro = () => (
  <div>
    <h1>FaceCompare</h1>
    <div className="intro">
      <div>
        Select 2 or 3 pictures of people to calculate how similar they are.
        <br />
        <br />
        This tool uses dlib for face detection, and{" "}
        <a href="http://cmusatyalab.github.io/openface/">OpenFace</a> pre-trained neural net models
        to compute a 128-dimensional face representation.
        <br />
        <br />
        Privacy Note: Our server does not store any of the photos you submit.
      </div>
    </div>
  </div>
);

class CompFace extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, fileToAliasMap: {} };
  }

  setIsLoading = (val) => {
    var nextState = { isLoading: val };
    if (val === true) {
      nextState.error = undefined;
    }
    this.setState(nextState);
  };
  setError = (val) => {
    this.setState({ error: val || "Backend is down. It's Kevin's fault! Try again in 12 hours." });
  };

  sendGoogleEvent = (numPhotos) => {
    window.gtag("event", "submit", { num_photos: numPhotos });
  };

  sendGoogleErrorEvent = (numPhotos) => {
    window.gtag("event", "backend_error", { num_photos: numPhotos });
  };

  // Target a specific file based on fileIndex
  // Set into state , keyd by index { file1: fileX, file2: fileY, file3: fileZ}
  fileChangedHandler = (fileIndex) => (files) => {
    console.log(fileIndex);
    // ImageUploader returns an array of Files
    const fileStrIndex = `file${fileIndex}`;
    this.setState({ [fileStrIndex]: files[0] });
    // Create default name in fileToAliasMap
    // Arbitrarily give long names (usually UUIDs) a default of A, B, C depending on fileIndex 1, 2, 3
    // Ascii A = 65, B = 66..

    const filename = files[0] && files[0].name;
    const alias = filename && filename.length > 32 ? getAliasFromIndex(fileIndex) : filename;
    // If needed, add to our aliasMap
    if (alias) {
      //
      var updateMap = this.state.fileToAliasMap || {};
      updateMap[filename] = alias;
      this.setState({ fileToAliasMap: updateMap });
    }
    // Note: currently this leads to buildup of canceled files in the fileToAliasMap
  };
  // Use aliasMap to stash & display the rewritten names
  onUpdateName = (fileIndex) => (event) => {
    var updateMap = { ...this.state.fileToAliasMap };
    const filename = this.getFilename(fileIndex);
    updateMap[filename] = event.target.value;
    this.setState({ fileToAliasMap: updateMap });
    // this.setState({ [fileIndex]: event.target.value });
  };

  uploadHandler = () => {
    console.log(this.state);
    const formData = new FormData();
    var numPhotos = 0;
    if (this.state.file1) {
      formData.append("imgs[]", this.state.file1, this.state.file1.name);
      numPhotos += 1;
    } else {
      console.log("Must select Image A");
    }
    if (this.state.file2) {
      formData.append("imgs[]", this.state.file2, this.state.file2.name);
      numPhotos += 1;
    } else {
      console.log("Must select Image B");
    }
    if (this.state.file3) {
      formData.append("imgs[]", this.state.file3, this.state.file3.name);
      numPhotos += 1;
    } else {
      console.log("Missing Image C, Proceeding");
    }
    console.log(formData.getAll("imgs[]"));
    if (formData.getAll("imgs[]").length < 2) {
      this.setError("Please select at least 2 images to compare.");
      this.scrollToBottom();
      return;
    }
    this.setIsLoading(true);
    this.sendGoogleEvent(numPhotos);
    // const backend = "https://0dcfd0ab0492.ngrok.io/post_imgs";
    const backend = "http://localhost:8089/post_imgs";
    // Cloud Engine instance
    // const backend = "http://34.123.140.94:8089/post_imgs";
    // Axios.post("http://192.168.1.6:9000/post_imgs", formData)
    Axios.post(backend, formData)
      .then(this.onBackendResponse)
      .catch((error) => {
        this.onBackendError(error, numPhotos);
      });
  };

  onBackendResponse = (response) => {
    console.log(response);
    this.setIsLoading(false);
    const resultArray = response.data.resultsArray;
    this.setState({ results: resultArray });
    console.log(this.state);
    this.scrollToBottom();
  };

  onBackendError = (error, numPhotos) => {
    this.setIsLoading(false);
    this.setError(error.response && error.response.data.error);
    this.sendGoogleErrorEvent(numPhotos);
    this.scrollToBottom();
  };

  getFilename = (fileNum) => {
    const fileStrIndex = `file${fileNum}`;
    return this.state[fileStrIndex] ? this.state[fileStrIndex].name : null;
  };

  getAliasFromFileIndex = (fileIndex) => {
    return this.state.fileToAliasMap[this.getFilename(fileIndex)];
  };

  scrollToBottom = () => {
    this.bottom.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    const errorHint = (error) =>
      error && error.startsWith("Unable to find a face") ? (
        <h4 className="errorHint">Hint: try a different photo and crop around the face.</h4>
      ) : null;

    const ErrorMsg = this.state.error ? (
      <div className="errorMsg">
        <h5>Error: {this.state.error} </h5>
        {errorHint(this.state.error)}
      </div>
    ) : null;

    const getAliasFromKey = (key) => {
      return this.state.fileToAliasMap[key] || key;
    };

    return (
      <div>
        <div className="row">
          <UploadCell
            num={1}
            fileChangedHandler={this.fileChangedHandler}
            getFilename={this.getFilename}
            getAliasFromFileIndex={this.getAliasFromFileIndex}
            onUpdateName={this.onUpdateName(1)}
          />
          <UploadCell
            num={2}
            fileChangedHandler={this.fileChangedHandler}
            getFilename={this.getFilename}
            getAliasFromFileIndex={this.getAliasFromFileIndex}
            onUpdateName={this.onUpdateName(2)}
          />
          <UploadCell
            num={3}
            fileChangedHandler={this.fileChangedHandler}
            getFilename={this.getFilename}
            getAliasFromFileIndex={this.getAliasFromFileIndex}
            onUpdateName={this.onUpdateName(3)}
          />
        </div>
        <button className="uploadFilesButton" onClick={this.uploadHandler}>
          {this.state.isLoading ? "Loading ..." : "Submit"}
        </button>
        {ErrorMsg}
        <ResultsSimilarityTable results={this.state.results} getAliasFromKey={getAliasFromKey} />
        {this.state.results ? (
          <div className="filename">
            Raw Distances between Image Representations (Smaller is more similar)
          </div>
        ) : null}
        <ResultsTable results={this.state.results} getAliasFromKey={getAliasFromKey} />
        {this.state.results ? (
          <div className="filename errorHint hintPadded">
            Hint: Edit the person's name in the box (optional). This makes the tables easier to
            read!
          </div>
        ) : null}
        <div // Placekeeper Div to enable scroll to end
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            this.bottom = el;
          }}
        ></div>
      </div>
    );
  }
}

const getAliasFromIndex = (index) => {
  return String.fromCharCode(64 + index);
};

const UploadCell = ({
  num,
  fileChangedHandler,
  getFilename,
  getAliasFromFileIndex,
  onUpdateName,
}) => {
  return (
    <div className="column">
      <ImageUploader
        withIcon={false}
        buttonText={`Choose Image ${getAliasFromIndex(num)}`}
        onChange={fileChangedHandler(num)}
        withPreview={true}
        imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
        maxFileSize={5242880}
        singleImage={true}
      />
      <div className="filename">
        {/* Only display filename if we replace the edit box with shortened name */}
        {getFilename(num) === getAliasFromFileIndex(num) ? null : getFilename(num)}
        <div>
          <input
            className="fileRename"
            title="(Optional) Type person's name"
            defaultValue={getAliasFromFileIndex(num)}
            type="text"
            onChange={onUpdateName}
          />
        </div>
      </div>
    </div>
  );
};

// Pass the function getAliasFromKey because React does not allow passing the object aliasMap for rending children
const ResultsTable = ({ results, getAliasFromKey }) => {
  return results ? (
    <div>
      <table className="summaryTable">
        <tbody>
          <tr>
            <th>Face 1</th>
            <th>Face 2</th>
            <th>Distance</th>
          </tr>
          {results.map(([img1, img2, norm]) => (
            <tr>
              <td>{getAliasFromKey(img1)}</td>
              <td>{getAliasFromKey(img2)}</td>
              <td>{norm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null;
};

const ResultsSimilarityTable = ({ results, getAliasFromKey }) => {
  const computeSimilarity = (norm) => 1 / (1 + Math.pow(Math.E, 3 * (norm - 2.08)));
  const computeSimilaritySub2 = (norm) => 1 / (1 + Math.pow(Math.E, 1.5 * (norm - 2.08)));
  //Linear interpolation between endpoints for 0.15 < x < 0.4
  const copmuteSimilaritySamePerson = (norm) => -0.2978717807 * norm + 1.044680767; // Push these values closer to 1
  const findSimilarity = (norm) => {
    if (norm <= 0.15) {
      return 1;
    }
    if (norm > 2.08) {
      return computeSimilarity(norm);
    }
    if (norm <= 2.08 && norm > 0.4) {
      return computeSimilaritySub2(norm);
    } else {
      return copmuteSimilaritySamePerson(norm);
    }
  };
  //when < 0.15, P = 1. when 0.15 <= P< 0.3
  // Multiply similarity by 100 to turn into percent
  const formattedSim = (norm) => Math.round(findSimilarity(norm) * 100 * 10) / 10;
  return results ? (
    <div>
      <table className="summaryTable">
        <tbody>
          <tr>
            <th>Face 1</th>
            <th>Face 2</th>
            <th>Similarity</th>
          </tr>
          {results.map(([img1, img2, norm]) => (
            <tr>
              <td>{getAliasFromKey(img1)}</td>
              <td>{getAliasFromKey(img2)}</td>
              <td>
                {computeSimilarity(norm) > 0.6 ? (
                  <b>{formattedSim(norm)}%</b>
                ) : (
                  `${formattedSim(norm)}%`
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null;
};
export default App;
