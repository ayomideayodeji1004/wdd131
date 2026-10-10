:root {
  --bg: #f4f5f9;
  --primary: #2b2d42;
  --accent: #8d99ae;
  --text: #1b1b1f;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.5;
}
header, footer {
  background: var(--primary);
  color: #fff;
  text-align: center;
  padding: 1rem;
}
footer p { margin: 0.25rem 0; }
main { max-width: 600px; margin: 1.5rem auto; padding: 0 1rem; }
.field, fieldset { margin-bottom: 1.25rem; border: none; padding: 0; }
label, legend { display: block; font-weight: bold; margin-bottom: 0.4rem; }
small, em { font-weight: normal; }
select, input[type="date"], input[type="text"], textarea {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid var(--accent);
  border-radius: 4px;
  font-size: 1rem;
}
.stars, .checks { display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; align-items: center; }
.stars label, .checks label { display: inline; font-weight: normal; margin: 0; }
input[type="submit"] {
  width: 100%;
  padding: 0.8rem;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
}
input[type="submit"]:hover, input[type="submit"]:focus { background: #1a1b2e; }
.confirm { text-align: center; }
@media (min-width: 700px) {
  main { padding: 2rem; background: #fff; border-radius: 8px; }
}