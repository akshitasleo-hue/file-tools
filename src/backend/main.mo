import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";

actor {
  include MixinStorage();

  type FileId = Text;
  type FileData = {
    blob : Storage.ExternalBlob;
    filename : Text;
    createdAt : Time.Time;
  };

  var fileCounter = 0;
  let files = Map.empty<FileId, FileData>();

  public shared ({ caller }) func uploadFile(blob : Storage.ExternalBlob, filename : Text) : async FileId {
    fileCounter += 1;
    let fileId = fileCounter.toText();
    let fileData : FileData = {
      blob;
      filename;
      createdAt = Time.now();
    };
    files.add(fileId, fileData);
    fileId;
  };

  public shared ({ caller }) func resizeImage(fileId : FileId, width : Nat, height : Nat) : async Storage.ExternalBlob {
    let fileData = switch (files.get(fileId)) {
      case (null) { Runtime.trap("File not found") };
      case (?data) { data };
    };
    // Actual resizing logic to be implemented client-side
    fileData.blob;
  };

  public shared ({ caller }) func convertFormat(fileId : FileId, format : Text) : async Storage.ExternalBlob {
    let fileData = switch (files.get(fileId)) {
      case (null) { Runtime.trap("File not found") };
      case (?data) { data };
    };
    // Format conversion to be handled client-side
    fileData.blob;
  };

  public shared ({ caller }) func compressFile(fileId : FileId) : async Storage.ExternalBlob {
    let fileData = switch (files.get(fileId)) {
      case (null) { Runtime.trap("File not found") };
      case (?data) { data };
    };
    // Compression logic to be implemented client-side
    fileData.blob;
  };

  public query ({ caller }) func downloadFile(fileId : FileId) : async FileData {
    switch (files.get(fileId)) {
      case (null) { Runtime.trap("File not found") };
      case (?data) { data };
    };
  };

  public shared ({ caller }) func cleanupFiles() : async () {
    let now = Time.now();
    let dayInNanos : Int = 24 * 60 * 60 * 1_000_000_000;
    let expiredFiles = Array.empty<FileId>();

    for ((fileId, fileData) in files.entries()) {
      if (now - fileData.createdAt > dayInNanos) {
        files.remove(fileId);
      };
    };
  };
};
