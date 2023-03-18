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
        os = "NixOS";
        betd = "🌂";
        # We don't fix the cause, we count panics
        kernelPanicsCounter = 3;
        targetLanguages = with pkgs; [
          go
          nodejs # Indirect
          rustc
          vlang
        ];
      };
    }
    ```
