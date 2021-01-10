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
    this.state = { isLoading: false, isError: false };
  }

  setIsLoading = (val) => {
    this.setState({ isLoading: val });
  };
  setIsError = (val) => {
    this.setState({ isError: val });
  };
  setError = (val) => {
    this.setState({ error: val });
  };

  // Target a specific file based on fileIndex
  fileChangedHandler = (fileIndex) => (files) => {
    console.log(fileIndex);
    console.log(files);
    // ImageUploader returns an array of Files
    this.setState({ [fileIndex]: files[0] });
  };

  onUpdateName = (fileIndex) => (event) => {
    var oldMap = { ...this.state.fileToAliasMap };
    const filename = this.getFilename(`file${fileIndex}`);
    oldMap[filename] = event.target.value;
    this.setState({ fileToAliasMap: oldMap });
    // this.setState({ [fileIndex]: event.target.value });
  };

  uploadHandler = () => {
    console.log(this.state);
    this.setIsLoading(true);
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
    this.setIsError(false);
    const resultArray = response.data.resultsArray;
    this.setState({ results: resultArray });
    console.log(this.state);
    this.scrollToBottom();
  };

  onBackendError = (error) => {
    this.setIsLoading(false);
    this.setIsError(true);
    this.setError(error.response.data.error);
  };

  getFilename = (fileNum) => {
    return this.state[fileNum] ? this.state[fileNum].name : null;
  };

  scrollToBottom = () => {
    this.bottom.scrollIntoView({ behavior: "smooth" });
  };

  errorHint = (error) =>
    error.startsWith("Unable to find a face")
      ? "Hint: try a different photo and crop around the face."
      : null;

  render() {
    return (
      <div>
        <div className="row">
          <UploadCell
            num="1"
            fileChangedHandler={this.fileChangedHandler}
            getFilename={this.getFilename}
            onUpdateName={this.onUpdateName("1")}
          />
          <UploadCell
            num="2"
            fileChangedHandler={this.fileChangedHandler}
            getFilename={this.getFilename}
            onUpdateName={this.onUpdateName("2")}
          />
          <UploadCell
            num="3"
            fileChangedHandler={this.fileChangedHandler}
            getFilename={this.getFilename}
            onUpdateName={this.onUpdateName("3")}
          />
        </div>
        <button className="uploadFilesButton" onClick={this.uploadHandler}>
          {this.state.isLoading ? "Loading ..." : "Submit"}
        </button>
        {this.state.isError ? <h5> Backend Error: {this.state.error} </h5> : null}
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

const UploadCell = ({ num, fileChangedHandler, getFilename, onUpdateName }) => {
  return (
    <div className="column">
      <ImageUploader
        withIcon={false}
        buttonText={`Choose Image ${num}`}
        onChange={fileChangedHandler(`file${num}`)}
        withPreview={true}
        imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
        maxFileSize={5242880}
        singleImage={true}
      />
      <div className="filename">{getFilename(`file${num}`)}</div>
      <input defaultValue={getFilename(`file${num}`)} type="text" onChange={onUpdateName} />
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
