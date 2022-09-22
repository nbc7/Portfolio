import AuthCheck from '../components/AuthCheck';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/context';
import { Card } from '../components/Card';
import { useGetGithubApiQuery } from '../graphql/generated';
import { auth, firestore } from '../lib/firebase';
import { SelectSearchable } from '../components/SelectSearchable';
import { SelectMultiSortable } from '../components/SelectMultiSortable';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function Admin({}) {
  return (
    <AuthCheck>
      <AdmPage />
    </AuthCheck>
  );
}

function AdmPage() {
  const { user } = useContext(UserContext);
  const profile = useGetGithubApiQuery().data?.viewer;
  const repositories = profile?.repositories.nodes;
  /* user
  accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVkNmJjOWRhMWFmMjM2ZjhlYTU2YTVkNjIyMzQwMWZmNGUwODdmMTEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTmF0aGFuIEJvcmdlcyBDYXN0cm8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUl0YnZtbG9zekl0LUlaUklsZjBBX0p5Mmx1WlNXSVVsbFpQbnN2eXhxM3Y9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcG9ydGZvbGlvLTQ5NTE1IiwiYXVkIjoicG9ydGZvbGlvLTQ5NTE1IiwiYXV0aF90aW1lIjoxNjYyNDA4MTAyLCJ1c2VyX2lkIjoiU3BvRTdTRExFZFludkhpaDFFRTJENDNqMHJnMSIsInN1YiI6IlNwb0U3U0RMRWRZbnZIaWgxRUUyRDQzajByZzEiLCJpYXQiOjE2NjI0MDgxMDIsImV4cCI6MTY2MjQxMTcwMiwiZW1haWwiOiJuYXRoYW5ib3JnZXNjYXN0cm9AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDMxMTU1MzQ1MzU3ODA3NjE2MzgiXSwiZW1haWwiOlsibmF0aGFuYm9yZ2VzY2FzdHJvQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.QACjM1gd3TeW3BTlv9_MvqRF2gINiOPqqJ3N5bwaPiJiqmeKRaub9OE1kVxzMi-NdVLlY23y3jKbaXoPGMEDUeBk_E5LrCHPiGlxPxbR4CwIeDwhbwc_I3l_SO4b5MrPumL40FaaTRLNGCX_Et3a9QjbdaLjoIXkWal3MfOyUxZVRDtiLTBQEEymx9EnZsK5u8FcOvBzCoFUkBBX6S0iEge6tDW9pbXRKbhZWcmEVzvWSge57ELxw0a4m1fw5KLuzM7HdzupEn8PhNlgq_Dzt2Nzgxfnup28UQvTZpTPM0q5uISceW-LwC3OQ4xqZVDN8XqT3L6qNyAuBUvrVLLSxw"
  auth: AuthImpl {app: FirebaseAppImpl, heartbeatServiceProvider: Provider, config: {…}, currentUser: UserImpl, emulatorConfig: null, …}
  displayName: "Nathan Borges Castro"
  email: "nathanborgescastro@gmail.com"
  emailVerified: true
  isAnonymous: false
  metadata: UserMetadata {createdAt: '1662408102226', lastLoginAt: '1662408102227', lastSignInTime: 'Mon, 05 Sep 2022 20:01:42 GMT', creationTime: 'Mon, 05 Sep 2022 20:01:42 GMT'}
  phoneNumber: null
  photoURL: "https://lh3.googleusercontent.com/a/AItbvmloszIt-IZRIlf0A_Jy2luZSWIUllZPnsvyxq3v=s96-c"
  proactiveRefresh: ProactiveRefresh {user: UserImpl, isRunning: true, timerId: 14, errorBackoff: 30000}
  providerData: [{…}]
  providerId: "firebase"
  reloadListener: userInfo => {…}
  reloadUserInfo: null
  stsTokenManager: StsTokenManager {refreshToken: 'AOEOulYTj9hCQf6gPi-Wf1K21Tm6ozhtMUbWakLewYtg2ztBU9…kqgEgc5ZKg_hxL9x9mssQHQv51qp3RejLpeCdBIYlu8UFaFa-', accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImVkNmJjOWRhMWFmMjM2Zj…pTPM0q5uISceW-LwC3OQ4xqZVDN8XqT3L6qNyAuBUvrVLLSxw', expirationTime: 1662411702505}
  tenantId: null
  uid: "SpoE7SDLEdYnvHih1EE2D43j0rg1"
  refreshToken: (...)
 */

  /* profile
  avatarUrl: "https://avatars.githubusercontent.com/u/90021751?v=4"
  bio: "Full Stack Developer"
  company: null
  email: "nathanborgescastro@gmail.com"
  location: "São Paulo, São Paulo, Brasil"
  login: "nbc7"
  name: "Nathan Borges Castro"
  pinnedItems:
    nodes: Array(6)
      0:
        description: null
        forkCount: 0
        homepageUrl: "portfolio-nbc7.vercel.app"
        id: "R_kgDOHp4VGw"
        name: "Portfolio"
        primaryLanguage: {__typename: 'Language', color: '#3178c6', name: 'TypeScript'}
        stargazerCount: 0
        __typename: "Repository"
        [[Prototype]]: Object
  repositories: {__typename: 'RepositoryConnection', nodes: Array(17)}
  twitterUsername: null
  websiteUrl: "https://portfolio-nbc7.vercel.app/"
  __typename: "User"
  */
  const [repository, setRepository] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState(['']);
  const [newTags, setNewTags] = useState(['']);

  const inputStyle = 'text-black w-[250px] sm:w-[500px] md:w-[628px] lg:w-[884px] rounded px-2 mb-4';

  const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('tags');
  const [querySnapshot] = useCollection(ref as any);
  const tagsDoc = querySnapshot?.docs.map((doc) => {
    return doc.data();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (repository === '' || tags[0] === '' || tags.length <= 0) return alert('Required field is empty.');

    const uid = auth.currentUser.uid;
    const ref = firestore.collection('users').doc(uid).collection('projects').doc(encodeURI(repository));

    const data = {
      repository,
      thumbnail,
      title,
      description,
      tags,
    };

    await ref.set(data);

    if (newTags) {
      newTags.forEach(async (newTag) => {
        const refTags = firestore.collection('users').doc(uid).collection('tags').doc(newTag);
        const dataTags = {
          name: newTag,
        };

        await refTags.set(dataTags);
      });
    }

    alert('Submit done.');
  };

  const fillForm = (repValue: string) => {
    const repIndex = repositories.findIndex((i) => i.name === repValue);

    if (repIndex < 0) return;

    let links = {
      javascript: 'https://static.imasters.com.br/wp-content/uploads/2019/06/06110736/JavaScript3.jpg',
      typescript: 'https://raw.githubusercontent.com/khaosdoctor/blog-assets/master/images/2022/06/10b88c68-typescript-logo.png',
      html: 'https://fazendowebsites.com/wp-content/uploads/2019/01/html-1080x500.png',
      kotlin: 'https://dkrn4sk0rn31v.cloudfront.net/uploads/2017/08/kotlin-a-nova-linguagem-oficial-para-desenvolvimento-android.png',
    };

    if (thumbnail === '' || Object.values(links).indexOf(thumbnail) > -1) {
      let lang = repositories[repIndex].primaryLanguage.name;

      setThumbnail(links[lang.toLowerCase()]);
    }

    setRepository(repositories[repIndex].id);
    setTitle(repValue);
    setDescription(repositories[repIndex].description);
  };

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <Card>
        <form>
          <div>
            <span>Repository: </span>
            <span className="text-laranja-500">*</span>
          </div>
          <SelectSearchable data={repositories} returnData={(data: string) => fillForm(data)} />

          <p>Thumbnail:</p>
          <input type="url" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} className={`${inputStyle}`} />

          <div>
            <img src={thumbnail} alt="" className="w-[250px] sm:w-[500px] md:w-[628px] lg:w-[884px]" />
          </div>
          <br />

          {/* <div>
              <span>Title: </span>
              <span className="text-laranja-500">*</span>
            </div>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={`${inputStyle}`} required />

            <p>Description:</p>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={`resize-none h-[150px] ${inputStyle}`} /> */}

          <div>
            <span>Tags: </span>
            <span className="text-laranja-500">*</span>
          </div>
          <SelectMultiSortable data={tagsDoc} returnData={(data) => setTags(data)} returnNewData={(data) => setNewTags(data)} />

          <br />

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-azul-500 text-cinza-900 hover:bg-cinza-900 hover:text-azul-500 rounded-lg p-2 shadow-card"
          >
            Submit
          </button>
        </form>
      </Card>
    </div>
  );
}
