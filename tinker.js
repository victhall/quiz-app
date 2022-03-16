<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>

  <h1>PLAY HERE</h1>

  <% for (let question of questions) {%>
    <div>
      <%= question.question %>
    </div>
    <form action="/trivia/<%=trivia[0]._id%>/play" method="POST">
      <%for (let option of question.options) {%>
        <input type="radio" name="<%= question._id%>" value="<%= option%>">
        <%= option %>
          </input>
          <% }%>
            <div>
            </div>
            <%}%>
            <button>Submit</button>
    </form>



</body>

</html>