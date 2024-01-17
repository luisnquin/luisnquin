{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = inputs:
    with inputs;
      flake-utils.lib.eachDefaultSystem (
        system: {
          defaultPackage = pkgs.hello;

          devShells.default = let
            pkgs = import nixpkgs {
              config = {
                allowBroken = false;
                allowUnfree = true;
              };
              inherit system;
            };
          in
            pkgs.mkShell {
              inherit system;

              buildInputs = with pkgs; [
                nodejs_21
                git
              ];
            };
        }
      );
}
