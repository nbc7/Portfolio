import React from 'react';
// import { Link } from 'react-router-dom';
import Link from 'next/link';
import { Folder, GitBranch, NewTab, Star } from '../components/Icons';
import { Card } from '../components/Card';
import { useGetGithubApiQuery } from '../graphql/generated';

export default function Projects() {
  // const [profile, setProfile] = useState<ProfileData | null>(null);
  const { data } = useGetGithubApiQuery();
  const profile = data?.viewer;
  // console.log(data?.viewer);

  // const handleProfile = async () => {
  //   const config = {
  //     headers: { Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}` },
  //   };
  //   const user = await axios.get('https://api.github.com/user', config);
  //   const repos = await axios.get('https://api.github.com/user/repos', config);

  //   // setProfile(user.data);
  //   console.log(user.data);
  //   console.log(repos.data);
  // };

  // useEffect(() => {
  //   handleProfile();
  // }, []);

  return (
    <div>
      <div className="flex flex-col lg:flex-row p-10 pb-0 gap-[60px]">
        <div className="w-fill flex flex-col gap-[30px]">
          <div>
            <Card>
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-xl leading-[25px]">Projects</h1>
                <Link className="font-normal text-sm leading-[18px] hover:text-white" href="/">
                  {'<Back'}
                </Link>
              </div>
            </Card>
          </div>

          {/* <div className="flex flex-wrap sm:flex-nowrap gap-[30px] justify-center"> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[30px] justify-center">
            {data?.viewer.repositories.nodes?.map((item) => {
              if (item?.__typename !== 'Repository') return;
              if (item.primaryLanguage?.__typename !== 'Language') return;
              if (typeof item.primaryLanguage.color !== 'string') return;

              return (
                <div className="w-fill" key={item.id}>
                  <Card>
                    <div className="flex flex-col gap-[22px] justify-between h-full">
                      <div className="flex flex-col justify-between items-start">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <div>
                              <Folder />
                            </div>

                            <strong className="text-base leading-5 font-bold ml-4 hover:text-white">
                              <a href={`https://github.com/${profile?.login}/${item.name}`} target="_blank" rel="noreferrer">
                                {item.name}
                              </a>
                            </strong>
                          </div>

                          {item.homepageUrl && (
                            <a
                              className="ml-4"
                              href={item.homepageUrl.includes('vercel') ? `https://${item.homepageUrl}` : item.homepageUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <div className="flex gap-1 text-xs items-center hover:text-white">
                                <span>preview</span>
                                <NewTab />
                              </div>
                            </a>
                          )}
                        </div>

                        <div className="mt-3 text-sm leading-5 font-normal">
                          <p>{item.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-between gap-4">
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center">
                            <div>
                              <Star />
                            </div>
                            <span className="text-[13px] leading-4 font-normal ml-2">{item.stargazerCount}</span>
                          </div>

                          <div className="flex items-center">
                            <div>
                              <GitBranch />
                            </div>
                            <span className="text-[13px] leading-4 font-normal ml-2">{item.forkCount}</span>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className={`h-[15px] w-[15px] rounded-full border-2`} style={{ backgroundColor: item.primaryLanguage.color }}></div>
                          <span className="font-normal text-sm leading-[18px] ml-2">{item.primaryLanguage.name}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-5 text-center">
        <p className="text-sm leading-5">Made by {profile?.login}</p>
      </div>
    </div>
  );
}
