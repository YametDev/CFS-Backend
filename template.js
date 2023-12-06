module.exports.templateEmail = (val) => {
  const firsttitle =
    '----------------------------------------------------------------'
  const rating = `<p>${'★'.repeat(val.rating)}${'☆'.repeat(5 - val.rating)}</p>`
  const review = val.review ? `<p>"${val.review}"</p>` : ''
  const subtitle = '<p/><p><b>Reactions to Service Parts:</b></p>'
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
  const text = `<p><b>Additional Comment</b>: ${
    val.review_text.length ? val.review_text : 'None'
  }</p>`
  const name = val.name?.length ? `<p/><p>${val.name}</p>` : ''
  const email = val.email?.length ? `<p/><p>${val.email}</p>` : ''
  const phone = val.phone?.length ? `<p/><p>${val.phone}</p>` : ''
  const comment =
    '<p/><p>Log into the Feedback Dashboard here to see overall results:</p>'
  const link = `https://leavefeedback.org/${val.company}/dashboard`
  const linkstr = `<a href="${link}">${link}</a>`
  return (
    firsttitle +
    rating +
    review +
    (val.rating === 5
      ? ''
      : subtitle + wait + friendliness + cleanliness + price + quality) +
    text +
    name +
    email +
    phone +
    comment +
    linkstr
  )
}

module.exports.templateSMS = (val) => {
  const firsttitle = `New Review to ${val.company}\n----------------------------------------------------------------\n`
  const rating = '★'.repeat(val.rating) + '☆'.repeat(5 - val.rating)
  const review = val.review ? `"${val.review}"\n` : '\n'
  const subtitle = 'Reactions to Service Parts:\n'
  const faces = ['😐', '🙁', '😐', '🙂']
  const wait = `${faces[val.review_score.wait]} Wait Time\n`
  const friendliness = `${
    faces[val.review_score.friendliness]
  } Staff Friendliness\n`
  const cleanliness = `${faces[val.review_score.cleanliness]} Cleanliness\n`
  const price = `${faces[val.review_score.price]} Value and Prices\n`
  const quality = `${faces[val.review_score.quality]} Quality of Products\n`
  const text = `Additional Comment: ${
    val.review_text.length ? val.review_text : 'None'
  }\n`
  const name = val.name?.length ? `${val.name}` : ''
  const email = val.email?.length ? `${val.email}` : ''
  const phone = val.phone?.length ? `${val.phone}` : ''
  const comment =
    'Log into the Feedback Dashboard here to see overall results:\n'
  const link = `https://leavefeedback.org/${val.company}/dashboard\n`
  const linkstr = link
  return (
    firsttitle +
    rating +
    review +
    (val.rating === 5
      ? ''
      : subtitle + wait + friendliness + cleanliness + price + quality) +
    text +
    name +
    email +
    phone +
    comment +
    linkstr
  )
}
