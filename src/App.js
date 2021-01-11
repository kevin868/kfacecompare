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
        Select 2 or 3 images to compute the distance between them.
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
    this.setState({ error: val });
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
    const getAliasFromIndex = (index) => {
      return String.fromCharCode(64 + index);
    };
    const filename = files[0].name;
    const alias = filename.length > 14 ? getAliasFromIndex(fileIndex) : filename;
    // If needed, add to our aliasMap
    if (alias) {
      //
      var updateMap = this.state.fileToAliasMap || {};
      updateMap[filename] = alias;
      this.setState({ fileToAliasMap: updateMap });
    }
  };
  // TODO: Fix display issues, rename Face A / Face B in table
  // Use aliasMap to display the rewritten names
  // TODO change ReactApp Icon and text
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
    if (this.state.file1) {
      formData.append("imgs[]", this.state.file1, this.state.file1.name);
    } else {
      console.log("Must select Image 1");
    }
    if (this.state.file2) {
      formData.append("imgs[]", this.state.file2, this.state.file2.name);
    } else {
      console.log("Must select Image 2");
    }
    if (this.state.file3) {
      formData.append("imgs[]", this.state.file3, this.state.file3.name);
    } else {
      console.log("Missing file 3, Proceeding");
    }
    console.log(formData.getAll("imgs[]"));
    if (formData.getAll("imgs[]").length < 2) {
      this.setError("Please select at least 2 images to compare.");
      this.scrollToBottom();
      return;
    }
    this.setIsLoading(true);
    const backend = "https://0dcfd0ab0492.ngrok.io/post_imgs";
    // Axios.post("http://192.168.1.6:9000/post_imgs", formData)
    Axios.post(backend, formData)
      .then(this.onBackendResponse)
      .catch((error) => {
        this.onBackendError(error);
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

  onBackendError = (error) => {
    this.setIsLoading(false);
    this.setError(error.response.data.error);
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
        <ResultsTable results={this.state.results} />
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
        buttonText={`Choose Image ${num}`}
        onChange={fileChangedHandler(num)}
        withPreview={true}
        imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
        maxFileSize={5242880}
        singleImage={true}
      />
      <div className="filename">
        {getFilename(num)}
        <div>
          <input
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

const ResultsTable = ({ results }) =>
  results ? (
    <div>
      <table className="summaryTable">
        <tbody>
          <tr>
            <th>Face A</th>
            <th>Face B</th>
            <th>Distance</th>
          </tr>
          {results.map(([img1, img2, norm]) => (
            <tr>
              <td>{img1}</td>
              <td>{img2}</td>
              <td>{norm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null;

export default App;
