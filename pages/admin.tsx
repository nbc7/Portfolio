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
