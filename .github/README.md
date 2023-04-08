# Hmm

![party-gopher](https://media.giphy.com/media/Gh1Jm4GbZU2tH7PHn4/giphy.gif)

## whoami

- Execute

    ```bash
    # Displays info about me
    $ npx luisnquin@latest
    ```

- Or just read this:

    ```nix
    {pkgs}: {
      me = rec {
        matrix = "@luisnquin:matrix.org";
        born = "November 23, 2002";
        os = "NixOS";
        betd = "🌂";
        kernelPanics = 3;
        targetLanguages = with pkgs; [
          go
          nodejs # indirect
          rustc
          vlang
        ];
      };
    }
    ```
