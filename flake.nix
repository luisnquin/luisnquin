{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = {nixpkgs, ...}: let
    systems = ["x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin"];
    forAllSystems = nixpkgs.lib.genAttrs systems;
    pkgsFor = system:
      import nixpkgs {
        config = {
          allowBroken = false;
          allowUnfree = true;
        };
        inherit system;
      };
  in {
    lib.ssh = import ./nix/ssh.nix;

    defaultPackage = forAllSystems (system: (pkgsFor system).hello);

    devShells = forAllSystems (system: {
      default = (pkgsFor system).mkShell {
        inherit system;
      };
    });
  };
}
