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
        Privacy Note: Our server does not store any of the photos you upload.
      </div>
    </div>
  </div>
);

class CompFace extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  fileChangedHandler = (fileIndex) => (files) => {
    console.log(fileIndex);
    console.log(files);
    // ImageUploader returns an array of Files
    this.setState({ [fileIndex]: files[0] });
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
    console.log("*************");
    console.log(formData.getAll("imgs[]"));
    Axios.post("http://localhost:9000/post_imgs", formData).then(this.onBackendResult);
  };

  onBackendResult = (result) => {
    console.log(result);
    const resultTuple = result.data.msg;
    this.setState({ results: resultTuple });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="column">
            <ImageUploader
              withIcon={false}
              buttonText="Choose Image 1"
              onChange={this.fileChangedHandler("file1")}
              withPreview={true}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
          </div>
          <div className="column">
            <ImageUploader
              withIcon={false}
              buttonText="Choose Image 2"
              onChange={this.fileChangedHandler("file2")}
              withPreview={true}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
          </div>
          <div className="column">
            <ImageUploader
              withIcon={false}
              buttonText="Choose Image 3"
              onChange={this.fileChangedHandler("file3")}
              withPreview={true}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
          </div>
        </div>
        <button onClick={this.uploadHandler}>Upload</button>
        <div>
          {this.state.results ? (
            <div className="summaryTable">
              <table>
                <tbody>
                  <tr>
                    <th>Face A</th>
                    <th>Face B</th>
                    <th>Distance</th>
                  </tr>
                  {this.state.results.map(([img1, img2, norm]) => (
                    <tr>
                      <td key={img1}>{img1}</td>
                      <td key={img2}>{img2}</td>
                      <td key={norm}>{norm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
