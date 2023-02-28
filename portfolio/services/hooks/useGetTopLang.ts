const token: string = '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'

export function useGetTopLanguage(username: string) {
    const query = `#graphql
        query userInfo($login: String!) {
            user(login: $login) {
                # fetch only owner repos & not forks
                repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
                    nodes {
                        name
                        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
                            edges {
                                size
                                node {
                                    color
                                    name
                                }
                            }
                        }
                    }
                }
            }
        }
    `

    useGraphQLToGitHub(query, {
        username
    })
}

/**
 *  query userInfo($login: String!) {
        user(login: $login) {
          # fetch only owner repos & not forks
          repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
            nodes {
              name
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    color
                    name
                  }
                }
              }
            }
          }
        }
      }
 * 
 */

export function useGraphQLToGitHub(query: string, binds?: object) {
    fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            Authorization: `token ${token}`
        },
        body: JSON.stringify({
            variables: binds,
            query
        })
    })
}
