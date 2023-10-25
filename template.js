module.exports.template = val => {
  const firsttitle = '----------------------------------------------------------------';
  const rating = "<p>" + "★".repeat(val.rating) + "☆".repeat(5-val.rating) + "</p>";
  const review = "<p>\"" + val.review + "\"</p>";
  const subtitle = "<p/><p><b>Reactions to Service Parts:</b></p>";
  const faces = ['😐', '🙁', '😐', '🙂'];
  const wait = "<p>" + faces[val.review_score.wait] + " Wait Time</p>";
  const friendliness = "<p>" + faces[val.review_score.friendliness] + " Staff Friendliness</p>";
  const cleanliness = "<p>" + faces[val.review_score.cleanliness] + " Cleanliness</p>";
  const price = "<p>" + faces[val.review_score.price] + " Value and Prices</p>";
  const quality = "<p>" + faces[val.review_score.quality] + " Quality of Products</p>";
  const text = "<p><b>Additional Comment</b>: " + val.review_text + "</p>";
  const name = val.name?.length ? "<p/><p>" + val.name + "</p>" : "";
  const email= val.email?.length ?"<p/><p>" + val.email+ "</p>" : "";
  const phone= val.phone?.length ?"<p/><p>" + val.phone+ "</p>" : "";
  const comment = "<p/><p>Log into the Feedback Dashboard here to see overall results:</p>";
  const link = "https://leavefeedback.com/" + val.company + "/dashboard";
  const linkstr = "<a href=\"" + link + "\">" + link + "</a>";
  return firsttitle + rating + review + subtitle + wait + friendliness + cleanliness + price + quality + text + name + email + phone + comment + linkstr;
}