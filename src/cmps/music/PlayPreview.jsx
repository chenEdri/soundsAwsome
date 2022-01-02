
export function PlayPreview({song,onLoadSong, loadKey}) {
  const {id} = song;
  const imgUrl = (loadKey === 'search')? song.imgUrl : song.snippet.thumbnails.medium.url
  const title = (loadKey === 'search')? song.title : song.snippet.title
  
  return (
    <article className='play-preview' onClick={()=>{ onLoadSong(id, loadKey)}}>
      <div>
        <img src={imgUrl || 'https://image.freepik.com/free-vector/musical-notes-frame-with-text-space_1017-32857.jpg'} alt=''/>
      </div>
      <p className="clr4"> {title}</p>
    </article>
  )
}
