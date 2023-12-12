module.exports.templateEmail = (val) => {
  const rating = `<p>${'★'.repeat(val.rating)}${'☆'.repeat(5 - val.rating)}</p>`
  const review = val.review ? `<p>"${val.review}"</p>` : ''
  const text = `<p><b>Comment:</b></p><p>${
    val.review_text.length ? val.review_text : 'None'
  }</p>`

  const subtitle = '<br/><p><b>Reactions to Service Parts:</b></p>'
  const faces = ['😐', '🙁', '😐', '🙂']
  const wait = `<p>${faces[val.review_score.wait]} Wait Time</p>`
  const friendliness = `<p>${
    faces[val.review_score.friendliness]
  } Staff Friendliness</p>`
  const cleanliness = `<p>${
    faces[val.review_score.cleanliness]
  } Cleanliness</p>`
  const price = `<p>${faces[val.review_score.price]} Value and Prices</p>`
  const quality = `<p>${
    faces[val.review_score.quality]
  } Quality of Products</p>`

  const comment = '<br/><p>Log into Dashboard below to see all results:</p>'
  const link = `https://leavefeedback.org/${val.company}/dashboard`
  const linkstr = `<a href="${link}">${link}</a>`

  return (
    rating +
    review +
    text +
    (val.rating === 5
      ? ''
      : subtitle + wait + friendliness + cleanliness + price + quality) +
    comment +
    linkstr
  )
}

module.exports.templateSMS = (val) => {
  const rating = '★'.repeat(val.rating) + '☆'.repeat(5 - val.rating)
  const review = val.review ? `"${val.review}"\n` : '\n'
  const text = `Comment: ${val.review_text.length ? val.review_text : 'None'}\n`
  const link = `https://leavefeedback.org/${val.company}/dashboard\n`
  return rating + review + text + link
}
