# Install **NAIV Developer Tools** extension on VSCode / VSCodium

## VSCode

1. Open VSCode

2. Go to **Extensions** window, search "naiv", then install the right one (published by "Naiv Developer")

![](/md-images/img41.png)

3. Test the extension by create a new empty file with extension name `.naiv`, e.g. `sample.naiv`, when opening the file it will look like this:

![](/md-images/img42.png)

It shows an input prompt for NAIV AI-feature, AI feature only available if you create a config file with name `.config` and contains two key inside the file

```ini
MODEL=openai/gpt-4o
SK=sk-or-v1-your-open-router-secret-key
```

Current VSCode extension only supports [OpenRouter](https://openrouter.ai/) as LLM vendor.

4. Test by write a simple database structure design like this into the `sample.naiv` file

```
table User {
  id bigint pk
  name varchar(200)
}

table Product {
  id bigint pk
  id_user User.id
  title varchar(200)
  description text
}
```

If everything is fine then after saving the file, the extension should renders the db relationship

![](/md-images/img43.png)

**Congratulations!!! You have sucessfully installed the NAIV VSCode Extension.**

## VSCodium

The steps is examply same like in VSCode.

[Next: Write your first NAIV DSL Code](/learning-resources/write-your-first-naiv-dsl-code)

