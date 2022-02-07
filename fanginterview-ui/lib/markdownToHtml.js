import remark from 'remark'
import html from 'remark-html'

export async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}


export function replaceMembership(html) {
  let ind = 0
  const searchTerm = '<p><strong>[membership]</strong></p>'
  const foundBlockInd = []
  while(ind < html.length) {
    const indexOfFirst = html.indexOf(searchTerm, ind);
    if (indexOfFirst > -1) {
      foundBlockInd.push(indexOfFirst);
      ind = indexOfFirst + 1;
    } else {
      break;
    }
  }

  let output = ''
  ind = 0;
  let endInd = -1;
  const endTerm = '<p><strong>[/membership]</strong></p>';
  foundBlockInd.forEach(startInd=>{
    output += html.substring(ind, startInd)
    endInd = html.indexOf(endTerm, startInd);
    output += '<div class="secret"> Please Sign in to unlock this.</div>'
    ind = endInd + endTerm.length;
  })
  if (endInd != -1) {
    output += html.substring(endInd + endTerm.length)
  }
  
  return output;
}