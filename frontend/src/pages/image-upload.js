import { useCallback, useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import httpService from '../utils/http-client';

const Home = () => {
  const [files, setFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    setFiles(acceptedFiles);
    setApiResponse(null);

    const formData = new FormData();
    const {user} = useAuth();
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type' : 'form-data',
      'Authorization': `Bearer ${user.accessToken}`
    }
    formData.append('image', acceptedFiles[0]);

    try{
      const response = await httpService.post('/image/upload', formData, {headers})
      setApiResponse(response.data);
    } catch (error) {
      console.error(error);
      setUploadMessage('Error uploading image');
    }
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Image Upload</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Upload an Image</h1>

        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop an image here, or click to select an image</p>
              </div>
            </section>
          )}
        </Dropzone>

        <div>
          {files.map(file => (
            <img key={file.name} src={URL.createObjectURL(file)} style={{ maxWidth: '100%' }} />
          ))}
        </div>

        {/* Display upload message */}
        {uploadMessage && <p>{uploadMessage}</p>}
        {/* Display API response */}
        {apiResponse && <ImageUploadResult data={apiResponse.data}/>}
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
        }

        .title,
        p {
          margin-bottom: 2rem;
        }

        p {
          font-size: 1.5rem;
          text-align: center;
        }

        section {
          border: 2px dashed #aaa;
          padding: 2rem;
          margin-top: 2rem;
          text-align: center;
        }

        img {
          margin-top: 2rem;
        }

        @media (max-width: 600px) {
          .title {
            font-size: 3rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Home