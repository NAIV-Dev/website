# Write your first NAIV DSL Code

## Prerequisite

- VSCode / VSCodium
- Make sure you have **Naiv Developer Tools** extension installed on your VSCode / VSCodium

Please refer to this article if you havent install the extension: [Install NAIV Developer Tools extension on VSCode / VSCodium](/learning-resources/install-naiv-developer-tools-extension-on-vscode-vscodium)

## Write DSL Code

1. Open your VSCode / VSCodium
2. Create a new folder, let say: `design`**
3. Create your first NAIV DSL file, I will name it: `db.naiv`***

Your screen will look like this

![](/md-images/img51.png)

4. Lets skip the AI feature for now, click **Open Code Editor** and write a simple database structure

```
table User {
  id bigint pk
  fullname varchar(200)
  username varchar(100)
  password varchar(50)
}
```

save the file, and the screen will automatically updated and render the design like this:

![](/md-images/img52.png)

5. Now, lets add api **user register** to the DSL but write it in different file: `api.naiv`

```
api post /register {
  body {
    fullname string required
    username string required
    password string required
  }
  return {
    token string required
    user table.User required
  } required
}
```

Your screen now will look like this

![](/md-images/img53.png)

> All files with extensions `*.naiv` in a same folder (not nested) will be treat as a whole single file (concatenated). It means, if a file contains error (syntax or semantic) then all the file in the same folder will be affected. It also concludes that a file in the same folder can reference enum/table/schema from different file.

** *I recommend to write the DSL in a dedicated folder. The folder can be anywhere but must contain only NAIV DSL code*

*** *NAIV DSL must have .naiv file extensions*

**Congratulations!!! You have completed to write your first NAIV DSL code.**

[Next: Design database with NAIV DSL](/learning-resources/design-database-with-naiv-dsl)
