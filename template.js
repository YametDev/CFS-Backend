module.exports.template = val => {
  const title = "<p><b>Reactions to Service Parts:</b></p>";
  const faces = ['😐', '🙁', '😐', '🙂'];
  const wait = "<p>" + faces[val.review_score.wait] + " Wait Time</p>";
  const friendliness = "<p>" + faces[val.review_score.friendliness] + " Staff Friendliness</p>";
  const cleanliness = "<p>" + faces[val.review_score.cleanliness] + " Cleanliness</p>";
  const price = "<p>" + faces[val.review_score.price] + " Value and Prices</p>";
  const quality = "<p>" + faces[val.review_score.quality] + " Quality of Products</p>";
  const text = "<p><b>Additional Comment</b>: " + val.review_text + "</p>";
  const comment = "<p>Log into the Feedback Dashboard here to see overall results:</p>";
  const link = "<a href=\"https://leavefeedback.com/outback23/dashboard\">https://leavefeedback.com/outback23/dashboard</a>";
  return title + wait + friendliness + cleanliness + price + quality + text + comment + link;
}