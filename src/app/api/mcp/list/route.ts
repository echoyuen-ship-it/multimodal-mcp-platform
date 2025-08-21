
export async function GET(){
  // A tiny static directory; replace with your crawler/sync later.
  const items = [
    { id:"web-search", name:"Web Search", desc:"Search the web and return snippets.", scopes:["read:web"] },
    { id:"notion", name:"Notion", desc:"Read/write your Notion workspace.", scopes:["read:notion","write:notion"] },
    { id:"postgres", name:"Postgres DB", desc:"Query a Postgres database", scopes:["read:db"] },
    { id:"github", name:"GitHub", desc:"Repo read/write", scopes:["read:gh","write:gh"] }
  ];
  return Response.json({ items });
}
