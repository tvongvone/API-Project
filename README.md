## Aliennb

Alien is a clone of the popular Air-bnb which is a online marketplace and hospitality service that allows people to rent out their homes or apartments to travelers.

Here is the live site! <a href="https://tonys-air-bnb.onrender.com">Tonysnb</a> 🏘️

## Tech Stack
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

**Database:**

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

**Hosting:**

![Render](https://img.shields.io/badge/Render-informational?style=for-the-badge&logo=render&logoColor=%5bdec3)

## Run Locally
### HTTPS
```bash
  git clone https://github.com/tvongvone/API-Project.git
```

### SSH
```bash
  git clone git@github.com:tvongvone/API-Project.git
```

Install dependencies for frontend

```bash
cd frontend
npm install --prefix frontend
```

install dependencies for the backend

```bash
cd backend
npm install --prefix backend 
```

Start the server in the frontend

```bash
cd frontend
npm start
```

In seperate terminal start in the backend

```bash
cd backend
npm start
```

## Landing Page

### Preview

![Screenshot (121)](https://user-images.githubusercontent.com/107327260/230183411-2768d6e8-37e4-49bc-af9e-57f38ffb86e9.png)

### Technical Challenges

Removing a single pin from a board. I passed both the boardId and pinId, looped through all of the boards pins, found the matching id, then popped the pin off the board so that it was just removed not deleted

```bash
  def remove_pin(id):

    res = request.get_json()
    pinId = int(res['pinId'])

    data = Board.query.get(id)
    for idx, x in enumerate(data.board_pins):
        if x.id == pinId:
            index = idx


    data.board_pins.pop(index)
    db.session.add(data)
    db.session.commit()

```
